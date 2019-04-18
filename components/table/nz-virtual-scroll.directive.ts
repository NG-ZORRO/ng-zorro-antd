import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nz-virtual-scroll]',
  exportAs: 'nzVirtualScroll'
})
export class NzVirtualScrollDirective {
  /* tslint:disable-next-line:no-any */
  constructor(public templateRef: TemplateRef<{ $implicit: any; index: number }>) {}
}
