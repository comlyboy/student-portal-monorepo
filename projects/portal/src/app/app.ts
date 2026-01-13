import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FederatedComponentDirective } from '@shared/lib/directives/federated-component.directive';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, FederatedComponentDirective],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {

}
