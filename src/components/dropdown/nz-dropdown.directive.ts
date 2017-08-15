import { Directive, ElementRef } from '@angular/core';
@Directive({
  selector: '[nz-dropdown]',
})
export class NzDropDownDirective {
  constructor(public elementRef: ElementRef) {
  }
}
