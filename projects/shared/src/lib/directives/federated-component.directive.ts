import { Directive, OnInit, OnDestroy, Input, ElementRef } from "@angular/core";
import { SingleSpaService } from "../services/single-spa.service";

@Directive({
	selector: '[microApp]'
})
export class MicroAppDirective implements OnInit, OnDestroy {
	@Input('microApp') appName!: string;

	private cleanup?: () => void;

	constructor(
		private el: ElementRef<HTMLElement>,
		private loader: SingleSpaService
	) { }

	async ngOnInit() {
		this.cleanup = await this.loader.mount(
			this.appName,
			this.el.nativeElement
		);
	}

	ngOnDestroy() {
		this.cleanup?.();
	}
}
