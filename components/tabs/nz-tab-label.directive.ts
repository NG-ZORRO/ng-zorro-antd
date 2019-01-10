import { Directive, ElementRef, Input } from '@angular/core';

import { InputBoolean } from '../core/util/convert';

@Directive({
  selector: '[nz-tab-label]',
  host    : {
    '[class.ant-tabs-tab]'         : 'true',
    '[class.ant-tabs-tab-disabled]': 'disabled'
  }
})
export class NzTabLabelDirective {
  @Input() @InputBoolean() disabled = false;

  constructor(public elementRef: ElementRef) {
  }

  getOffsetLeft(): number {
    return this.elementRef.nativeElement.offsetLeft;
  }

  getOffsetWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }

  getOffsetTop(): number {
    return this.elementRef.nativeElement.offsetTop;
  }

  getOffsetHeight(): number {
    return this.elementRef.nativeElement.offsetHeight;
  }
}
