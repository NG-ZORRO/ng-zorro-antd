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

  el = this.elementRef.nativeElement;

  getOffsetLeft(): number { return this.el.offsetLeft; }
  getOffsetWidth(): number { return this.el.offsetWidth; }
  getOffsetTop(): number { return this.el.offsetTop; }
  getOffsetHeight(): number { return this.el.offsetHeight; }

  constructor(public elementRef: ElementRef) {}
}
