import { Router, NavigationStart } from '@angular/router';

import { bootstrapApplication } from '@angular/platform-browser';

import { singleSpaAngular } from 'single-spa-angular';

import { App } from './app/app';
import { appConfig } from './app/app.config';
import { singleSpaPropsSubject } from '../../../single-spa/single-spa-props';


const lifecycles = singleSpaAngular({
	Router,
	NgZone: 'noop',
	NavigationStart,
	template: '<student-info-root />',
	bootstrapFunction: (appProps) => {
		singleSpaPropsSubject.next(appProps);
		return bootstrapApplication(App, {
			...appConfig,
			// providers: [...getSingleSpaExtraProviders(), ...appConfig?.providers],
		})
	}
});

export const mount = lifecycles.mount;
export const update = lifecycles.update;
export const unmount = lifecycles.unmount;
export const bootstrap = lifecycles.bootstrap;
