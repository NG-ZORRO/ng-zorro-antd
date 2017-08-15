import { Directive, ElementRef } from '@angular/core';
@Directive({
  selector: '[nz-popover]',
})
export class NzPopoverDirective {
  constructor(public elementRef: ElementRef) {
  }
}
