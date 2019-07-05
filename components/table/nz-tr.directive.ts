/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Host, Input, Optional, Renderer2 } from '@angular/core';
import { toBoolean } from 'ng-zorro-antd/core';
import { NzTableComponent } from './nz-table.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'tr:not([mat-row]):not([mat-header-row])',
  host: {
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

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Host() @Optional() public nzTableComponent: NzTableComponent
  ) {}
}
