/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Directive({
  selector: '[nz-dropdown]',
  exportAs: 'nzDropdown'
})
export class NzDropDownDirective {
  el: HTMLElement = this.elementRef.nativeElement;
  hover$: Observable<boolean> = merge(
    fromEvent(this.el, 'mouseenter').pipe(mapTo(true)),
    fromEvent(this.el, 'mouseleave').pipe(mapTo(false))
  );
  $click: Observable<boolean> = fromEvent(this.el, 'click').pipe(
    tap(e => e.stopPropagation()),
    mapTo(true)
  );

  setDisabled(disabled: boolean): void {
    if (disabled) {
      this.renderer.setAttribute(this.el, 'disabled', '');
    } else {
      this.renderer.removeAttribute(this.el, 'disabled');
    }
  }

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-dropdown-trigger');
  }
}
