import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { InputBoolean } from 'ng-zorro-antd/core';

@Directive({
  selector: '[nz-tab-label]',
  exportAs: 'nzTabLabel',
  host: {
    '[class.ant-tabs-tab-disabled]': 'disabled'
  }
})
export class NzTabLabelDirective {
  @Input() @InputBoolean() disabled = false;

  constructor(public elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-tabs-tab');
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
