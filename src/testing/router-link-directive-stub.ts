import { Directive, HostListener, Input } from '@angular/core';

// export for convenience.
export { RouterLink} from '@angular/router';

/* tslint:disable:directive-class-suffix */
@Directive({
  selector: '[routerLink]',
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click') onClick() {
    this.navigatedTo = this.linkParams;
  }
}

/// Dummy module to satisfy Angular Language service. Never used.
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    RouterLinkDirectiveStub,
  ],
  exports: [
    RouterLinkDirectiveStub
  ]
})
export class RouterStubsModule {}
