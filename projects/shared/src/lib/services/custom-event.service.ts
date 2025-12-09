import { effect, EffectRef, Injectable, signal, WritableSignal } from '@angular/core';
import { CustomEventNamesEnum } from '../constants';

interface ICustomEventData<T = any> {
	signal: WritableSignal<T | null>;
}

@Injectable({ providedIn: 'root' })
export class CustomEventService {
	private readonly _EVENT_NAME = '__portal_events__';

	private channels = new Map<string, ICustomEventData<any>>();

	private getChannel<T>(type: CustomEventNamesEnum): ICustomEventData<T> {
		if (!this.channels.has(type)) {
			this.channels.set(type, {
				signal: signal<T | null>(null),
			});
		}
		return this.channels.get(type)!;
	}

	private pushToChannel<TPayload>(type: CustomEventNamesEnum, payload: TPayload): void {
		const channel = this.getChannel<TPayload>(type).signal;
		channel.set(payload);
		// clear so new subscribers don't see old events (SNS fire-and-forget)
		queueMicrotask(() => {
			channel.set(null);
		});
	}

	constructor() {
		// Single native CustomEvent listener for the whole app
		(window as any).addEventListener(this._EVENT_NAME, (e: CustomEvent<{
			type: CustomEventNamesEnum;
			payload: any;
		}>) => {
			const { type, payload } = e.detail;
			this.pushToChannel(type, payload);
		});
	}

	/** Low-level access: returns the signal (T | null) for a topic */
	listenRaw<TPayload>(type: CustomEventNamesEnum): WritableSignal<TPayload | null> {
		return this.getChannel<TPayload>(type).signal;
	}

	/** Native publish: must go through CustomEvent */
	dispatch<TPayload>(type: CustomEventNamesEnum, payload?: TPayload): void {
		window.dispatchEvent(
			new CustomEvent(this._EVENT_NAME, {
				detail: { type, payload: payload || null }
			})
		);
	}

	/**
	 * High-level helper: runs handler only when there is a non-null payload.
	 * Returns a destroy function if you want to clean it up manually (e.g. from a service).
	 * In components, you can usually ignore it and let Angular destroy the effect.
	 */
	listen<TPayload = { message: string; } & Record<string, any>>(type: CustomEventNamesEnum, handler: (payload: TPayload) => void): EffectRef {
		const sig = this.listenRaw<TPayload>(type);
		return effect(() => {
			const value = sig();
			if (value !== null) {
				handler(value);
			}
		});
	}

}
