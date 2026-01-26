// app/core/custom-event.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { PortalEventMap } from '../types';

type EventKey = keyof PortalEventMap;

@Injectable({ providedIn: 'root' })
export class CustomEventsService {
	private signals = new Map<EventKey, WritableSignal<any>>();

	constructor() {
		this.bootstrapListeners();
	}

	/** Listen to all known CustomEvents */
	private bootstrapListeners() {
		(Object.keys({}) as EventKey[]).forEach(() => { });
		// listeners are attached lazily
	}

	/** Get a signal for an event */
	listen<TValue = any, TKey extends EventKey = EventKey>(eventName: TKey | string) {
		if (!this.signals.has(eventName as EventKey)) {
			const sig = signal<PortalEventMap[TKey] | null>(null);
			this.signals.set(eventName as EventKey, sig);

			window.addEventListener(eventName, (event: Event) => {
				const customEvent = event as CustomEvent<PortalEventMap[TKey]>;
				sig.set(customEvent.detail);
			});
		}

		return this.signals.get(eventName as EventKey)! as TValue;
	}

	/** Emit event (optional for shell apps) */
	emit<K extends EventKey>(eventName: K, payload: PortalEventMap[K]) {
		window.dispatchEvent(
			new CustomEvent(eventName, { detail: payload })
		);
	}
}
