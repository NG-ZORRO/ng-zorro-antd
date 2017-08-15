import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-tooltip]',
})
export class NzTooltipDirective {
  @HostBinding('class.ant-tooltip-open') isTooltipOpen;

  constructor(public elementRef: ElementRef) {
  }
}
