import { inject, Injectable } from '@angular/core';

import { CustomEventService } from './custom-event.service';
import { CustomEventNamesEnum } from '../constants';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	private readonly customEventService = inject(CustomEventService);

	authenticate() {
		// Notify successful authentication
		this.customEventService.dispatch(CustomEventNamesEnum.AUTHENTICATION_SUCCESS, {})
	}

}
