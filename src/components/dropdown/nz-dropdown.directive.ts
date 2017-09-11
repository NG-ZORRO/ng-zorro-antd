import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-dropdown]',
})
export class NzDropDownDirective {
  @HostBinding('class.ant-dropdown-trigger') _dropDownTrigger = true;
  constructor(public elementRef: ElementRef) {
  }
}
