import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FederatedComponentDirective } from './federated-component.directive';
import { ModuleFederationService } from '../services/module-federation.service';

describe('FederatedComponentDirective', () => {

	@Component({
		standalone: true,
		imports: [FederatedComponentDirective],
		template: `
      <ng-container
        libFederatedComponent
        [remoteEntry]="'remote'"
        [exposedModule]="'./Module'"
        [componentName]="'Cmp'">
      </ng-container>
    `
	})
	class DummyHostComponent { }

	@Component({
		standalone: true,
		template: `<p>Fake Federated Component</p>`
	})
	class FakeFederatedComponent { }

	const mfServiceMock = {
		load: vi.fn().mockResolvedValue({
			Cmp: FakeFederatedComponent
		})
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [DummyHostComponent],
			providers: [
				{
					provide: ModuleFederationService,
					useValue: mfServiceMock
				}
			]
		});
	});

	it('should render federated component', async () => {
		const fixture = TestBed.createComponent(DummyHostComponent);
		fixture.detectChanges();
		await fixture.whenStable();

		const html = fixture.nativeElement.innerHTML;
		expect(html).toContain('Fake Federated Component');
	});
});
