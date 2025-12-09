import { Injectable, signal } from '@angular/core';

import { CustomEventNamesEnum } from '../constants';
import { CustomEventService } from './custom-event.service';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {

	private readonly notificationSignal = signal<string | null>(null);

	constructor(private readonly customEventService: CustomEventService) {
		this.customEventService.listen(CustomEventNamesEnum.NOTIFICATION_SEND, (payload) => {
			this.notificationSignal.set(payload.message);
		});
	}

	getNotificationsSignal() {
		return this.notificationSignal;
	}

}
