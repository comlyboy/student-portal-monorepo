import { Directive, OnInit, OnDestroy, Input, ElementRef } from "@angular/core";
import { SingleSpaLoaderService } from "../services/single-spa.service";

@Directive({
	selector: '[microApp]'
})
export class MicroAppDirective implements OnInit, OnDestroy {
	@Input('microApp') appName!: string;

	constructor(
		private el: ElementRef<HTMLElement>,
		private loader: SingleSpaLoaderService
	) { }

	async ngOnInit() {
		await this.loader.mount(
			this.appName,
			this.el.nativeElement
		);
	}

	ngOnDestroy() {
		this.loader.unmount(this.appName);
	}
}
