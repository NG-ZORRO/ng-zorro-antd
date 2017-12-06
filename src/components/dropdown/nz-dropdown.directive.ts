import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-dropdown]',
  host: {
    '[class.ant-dropdown-trigger]': 'true'
  }
})
export class NzDropDownDirective {
  constructor(public elementRef: ElementRef) {
  }
}
