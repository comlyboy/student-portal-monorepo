import { Directive, AfterViewInit, OnDestroy, input, ViewContainerRef } from '@angular/core';

import { ModuleFederationService } from '../services/module-federation.service';

@Directive({
	selector: '[libFederatedComponent]',
	standalone: true
})
export class FederatedComponentDirective implements AfterViewInit, OnDestroy {

	readonly remoteEntry = input.required<string>();
	readonly exposedModule = input.required<string>();
	readonly componentName = input.required<string>();

	constructor(
		private readonly viewContainerRef: ViewContainerRef,
		private readonly mFService: ModuleFederationService
	) { }

	async ngAfterViewInit() {
		try {
			const remoteModule = await this.mFService.load({
				loadOptions: {
					remoteEntry: this.remoteEntry(),
					exposedModule: this.exposedModule(),
					type: 'module'
				},
				otherOptions: { ignoreCashing: false }
			});

			const component = remoteModule?.[this.componentName()];
			if (!component) {
				throw new Error(`Export "${this.componentName()}" not found in remote`);
			}

			this.viewContainerRef.clear();
			this.viewContainerRef.createComponent(component);

		} catch (err) {
			console.error('❌ Failed to mount microapp', err);
			this.viewContainerRef.clear();
		}
	}

	ngOnDestroy() {
		this.viewContainerRef.clear();
	}

}
