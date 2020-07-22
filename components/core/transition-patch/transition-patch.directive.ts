/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * hack the bug
 * angular router change with unexpected transition trigger after calling applicationRef.attachView
 * https://github.com/angular/angular/issues/34718
 */
@Directive({
  selector: '[nz-button],nz-button-group,[nz-icon],[nz-menu-item],[nz-submenu],nz-select-top-control,nz-select-placeholder'
})
export class NzTransitionPatchDirective implements AfterViewInit, OnChanges {
  @Input() hidden: NzSafeAny = null;
  setHiddenAttribute(): void {
    if (this.hidden === true) {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
    } else if (this.hidden === false || this.hidden === null) {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'hidden');
    } else if (typeof this.hidden === 'string') {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', this.hidden);
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
  }

  ngOnChanges(): void {
    this.setHiddenAttribute();
  }

  ngAfterViewInit(): void {
    this.setHiddenAttribute();
  }
}
