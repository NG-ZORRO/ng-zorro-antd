/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterViewInit, Directive, ElementRef, inject, Input, OnChanges, Renderer2 } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * hack the bug
 * angular router change with unexpected transition trigger after calling applicationRef.attachView
 * https://github.com/angular/angular/issues/34718
 */
@Directive({
  selector:
    '[nz-button], [nz-icon], nz-icon, [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group'
})
export class NzTransitionPatchDirective implements AfterViewInit, OnChanges {
  private elementRef = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  @Input() hidden: NzSafeAny = null;
  setHiddenAttribute(): void {
    if (this.hidden) {
      if (typeof this.hidden === 'string') {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', this.hidden);
      } else {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
      }
    } else {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'hidden');
    }
  }

  constructor() {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
  }

  ngOnChanges(): void {
    this.setHiddenAttribute();
  }

  ngAfterViewInit(): void {
    this.setHiddenAttribute();
  }
}
