import { Component, computed, effect, inject, signal } from '@angular/core';
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
			const student = this.customEventsService.listen<Record<string, any>>('student:selected')();

		});
	}

}
