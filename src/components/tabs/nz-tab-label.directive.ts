import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[nz-tab-label]'
})
export class NzTabLabelDirective {
  @HostBinding('class.ant-tabs-tab') true;

  @Input() @HostBinding('class.ant-tabs-tab-disabled') disabled = false;

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
