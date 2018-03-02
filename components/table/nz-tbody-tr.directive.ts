import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { toBoolean } from '../core/util/convert';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nz-table thead tr',
  host    : {
    '[class.ant-table-row]': 'true'
  }
})

export class NzTbodyTrDirective {

  @Input()
  set nzExpand(value: boolean) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-table-expanded-row');
    if (value) {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }
}
