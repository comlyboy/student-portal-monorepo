import { Injectable } from '@angular/core';

import { loadRemoteModule, LoadRemoteModuleEsmOptions, LoadRemoteModuleScriptOptions } from '@angular-architects/module-federation';

@Injectable({ providedIn: 'root' })
export class ModuleFederationService {

	private cache = new Map<string, Promise<any>>();

	load({ loadOptions, otherOptions }: {
		loadOptions: LoadRemoteModuleScriptOptions | LoadRemoteModuleEsmOptions;
		otherOptions: { ignoreCashing: boolean; };
	}): Promise<any> {
		loadOptions.remoteEntry = (!loadOptions?.remoteEntry || loadOptions?.remoteEntry.endsWith('/remoteEntry.js')) ? loadOptions?.remoteEntry : `${loadOptions?.remoteEntry.replace(/\/$/, '')}/remoteEntry.js`;

		const key = `${loadOptions.remoteEntry}_${loadOptions.exposedModule}`;
		if (!otherOptions.ignoreCashing) {
			if (!this.cache.has(key)) {
				this.cache.set(key, loadRemoteModule({ ...loadOptions }));
			}
			return this.cache.get(key)!;
		}
		return loadRemoteModule({ ...loadOptions });
	}

	clear(key?: string) {
		if (key) {
			this.cache.delete(key);
		} else {
			this.cache.clear();
		}
	}

}
