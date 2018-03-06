import { Directive, ElementRef, Host, Input, Optional, Renderer2 } from '@angular/core';
import { toBoolean } from '../core/util/convert';
import { NzTableComponent } from './nz-table.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'tr',
  host    : {
    '[class.ant-table-row]': 'nzTableComponent'
  }
})

export class NzTrDirective {

  @Input()
  set nzExpand(value: boolean) {
    if (toBoolean(value)) {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-table-expanded-row');
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-table-expanded-row');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Host() @Optional() public nzTableComponent: NzTableComponent) {

  }
}
