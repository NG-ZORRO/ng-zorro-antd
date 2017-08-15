import { Directive, ElementRef } from '@angular/core';
@Directive({
  selector: '[nz-popconfirm]',
})
export class NzPopconfirmDirective {
  constructor(public elementRef: ElementRef) {
  }
}
