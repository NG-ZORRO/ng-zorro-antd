/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nzClassListAdd]',
  exportAs: 'nzClassListAdd'
})
export class NzClassListAddDirective {
  classList: string[] = [];

  @Input()
  set nzClassListAdd(list: string[]) {
    this.classList.forEach(name => {
      this.renderer.removeClass(this.elementRef.nativeElement, name);
    });
    list.forEach(name => {
      this.renderer.addClass(this.elementRef.nativeElement, name);
    });
    this.classList = list;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
