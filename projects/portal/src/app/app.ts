import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CustomEventsService } from '@shared/lib/services/custom-events.service';

@Component({
	selector: 'portal-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {
	protected readonly title = signal('portal');

	private readonly customEventsService = inject(CustomEventsService);

	// readonly d = computed(() => this.customEventsService.listen('student:selected')());

	constructor() {
		effect((d) => {
			this.customEventsService.listen('student:selected')();
		});
	}

}
