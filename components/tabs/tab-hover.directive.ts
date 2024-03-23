/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[nzTabHover]'
})
export class NzTabHoverDirective {
  //This directive is acting like CSS :hover, but it's fixing weird :hover behaviour on drag events
  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostListener('mouseover') onMouseOver(): void {
    this.el.classList.add('ant-tab-hover');
  }

  @HostListener('mouseout') onMouseLeave(): void {
    this.el.classList.remove('ant-tab-hover');
  }
}
