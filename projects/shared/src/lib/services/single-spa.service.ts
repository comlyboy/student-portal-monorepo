import { Injectable } from '@angular/core';
import {
	registerApplication,
	start,
	unloadApplication,
} from 'single-spa';

interface AppEntry {
	refs: number;
	active: boolean;
}

@Injectable({ providedIn: 'root' })
export class SingleSpaLoaderService {
	private apps = new Map<string, AppEntry>();
	private started = false;

	private ensureStarted() {
		if (!this.started) {
			start({ urlRerouteOnly: true });
			this.started = true;
		}
	}

	async mount(appName: string, host: HTMLElement): Promise<void> {
		this.ensureStarted();

		let entry = this.apps.get(appName);

		if (!entry) {
			entry = { refs: 0, active: false };
			this.apps.set(appName, entry);

			registerApplication({
				name: appName,
				app: () => (window as any).System.import(appName),
				activeWhen: () => entry!.active,
				customProps: {
					domElement: host,
				},
			});
		}

		entry.refs++;

		if (!entry.active) {
			entry.active = true;

			// trigger single-spa reroute
			window.dispatchEvent(new PopStateEvent('popstate'));
		}
	}

	async unmount(appName: string): Promise<void> {
		const entry = this.apps.get(appName);
		if (!entry) return;

		entry.refs--;

		if (entry.refs === 0 && entry.active) {
			entry.active = false;

			// normal unmount via activeWhen
			window.dispatchEvent(new PopStateEvent('popstate'));

			// ensure full cleanup
			await unloadApplication(appName, {
				waitForUnmount: true,
			});

			this.apps.delete(appName);
		}
	}
}
