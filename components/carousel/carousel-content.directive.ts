/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nz-carousel-content]',
  exportAs: 'nzCarouselContent'
})
export class NzCarouselContentDirective {
  readonly el: HTMLElement;

  set isActive(value: boolean) {
    this._active = value;
    if (this.isActive) {
      this.renderer.addClass(this.el, 'slick-active');
    } else {
      this.renderer.removeClass(this.el, 'slick-active');
    }
  }

  get isActive(): boolean {
    return this._active;
  }

  private _active = false;

  constructor(elementRef: ElementRef, private renderer: Renderer2) {
    this.el = elementRef.nativeElement;
    this.renderer.addClass(elementRef.nativeElement, 'slick-slide');
  }
}
