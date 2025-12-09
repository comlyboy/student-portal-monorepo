import { inject, Injectable, signal } from '@angular/core';
import { Auth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, signOut } from '@angular/fire/auth';

import { CustomEventService } from './custom-event.service';
import { CustomEventNamesEnum } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	readonly isAuthenticatedSignal = signal(false);

	user$: Observable<any>;

	private readonly customEventService = inject(CustomEventService);

	constructor(private auth: Auth) {
		getRedirectResult(this.auth).then(res => {
			console.log('Google redirect result:', res);
		});
	}

	async authenticate() {
		const provider = new GoogleAuthProvider();
		await signInWithRedirect(this.auth, provider);
		this.isAuthenticatedSignal.set(true);

		// Dispatch successful authentication event
		this.customEventService.dispatch(CustomEventNamesEnum.AUTHENTICATION_SUCCESS, {});
	}

	async logout() {
		await signOut(this.auth);
	}

}
