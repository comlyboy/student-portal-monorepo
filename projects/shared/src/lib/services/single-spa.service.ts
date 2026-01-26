import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SingleSpaService {
	private apps = new Map<
		string,
		{ app: any; refs: number; mounted: boolean }
	>();

	async mount(appName: string, host: HTMLElement): Promise<() => void> {
		let entry = this.apps.get(appName);

		if (!entry) {
			const app = await (window as any).System.import(appName);
			entry = { app, refs: 0, mounted: false };
			this.apps.set(appName, entry);
		}

		entry.refs++;

		if (!entry.mounted) {
			try {
				await entry.app.bootstrap?.();
				await entry.app.mount({ domElement: host });
				entry.mounted = true;
			} catch (err) {
				console.error(`[single-spa:${appName}]`, err);
				host.innerHTML = `<div>Failed to load ${appName}</div>`;
			}
		}

		return () => this.unmount(appName);
	}

	private async unmount(appName: string) {
		const entry = this.apps.get(appName);
		if (!entry) return;

		entry.refs--;

		if (entry.refs === 0 && entry.mounted) {
			try {
				await entry.app.unmount?.();
			} finally {
				this.apps.delete(appName);
			}
		}
	}
}
