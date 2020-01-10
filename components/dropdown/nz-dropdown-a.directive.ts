/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'a[nz-dropdown]',
  exportAs: 'nzDropdown'
})
export class NzDropDownADirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-dropdown-link');
  }
}
