/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';

import { NzTabPositionMode } from './interfaces';

@Directive({
  selector: 'nz-tabs-ink-bar, [nz-tabs-ink-bar]',
  host: {
    class: 'ant-tabs-ink-bar',
    '[class.ant-tabs-ink-bar-animated]': '_animated'
  }
})
export class NzTabsInkBarDirective {
  private ngZone = inject(NgZone);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  @Input() position: NzTabPositionMode = 'horizontal';
  @Input() animated = true;

  animationMode = inject(ANIMATION_MODULE_TYPE, { optional: true });
  get _animated(): boolean {
    return this.animationMode !== 'NoopAnimations' && this.animated;
  }

  alignToElement(element: HTMLElement): void {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.setStyles(element));
    });
  }

  setStyles(element: HTMLElement): void {
    if (this.position === 'horizontal') {
      this.el.style.top = '';
      this.el.style.height = '';
      this.el.style.left = this.getLeftPosition(element);
      this.el.style.width = this.getElementWidth(element);
    } else {
      this.el.style.left = '';
      this.el.style.width = '';
      this.el.style.top = this.getTopPosition(element);
      this.el.style.height = this.getElementHeight(element);
    }
  }

  getLeftPosition(element: HTMLElement): string {
    return element ? `${element.offsetLeft || 0}px` : '0';
  }

  getElementWidth(element: HTMLElement): string {
    return element ? `${element.offsetWidth || 0}px` : '0';
  }

  getTopPosition(element: HTMLElement): string {
    return element ? `${element.offsetTop || 0}px` : '0';
  }

  getElementHeight(element: HTMLElement): string {
    return element ? `${element.offsetHeight || 0}px` : '0';
  }
}
