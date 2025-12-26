/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Directive, ElementRef, NgZone, inject, input } from '@angular/core';

import { isAnimationEnabled } from 'ng-zorro-antd/core/animation';
import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';

import { NzTabPositionMode } from './interfaces';

@Directive({
  selector: 'nz-tabs-ink-bar, [nz-tabs-ink-bar]',
  host: {
    class: 'ant-tabs-ink-bar',
    '[class.ant-tabs-ink-bar-animated]': 'animationEnabled()'
  }
})
export class NzTabsInkBarDirective {
  private readonly ngZone = inject(NgZone);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly position = input<NzTabPositionMode>('horizontal');
  readonly animated = input(true);
  protected readonly animationEnabled = isAnimationEnabled(() => this.animated());

  alignToElement(element: HTMLElement): void {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.setStyles(element));
    });
  }

  setStyles(element: HTMLElement): void {
    if (this.position() === 'horizontal') {
      this.el.style.top = '';
      this.el.style.height = '';
      this.el.style.left = coerceCssPixelValue(element?.offsetLeft || 0);
      this.el.style.width = coerceCssPixelValue(element?.offsetWidth || 0);
    } else {
      this.el.style.left = '';
      this.el.style.width = '';
      this.el.style.top = coerceCssPixelValue(element?.offsetTop || 0);
      this.el.style.height = coerceCssPixelValue(element?.offsetHeight || 0);
    }
  }
}
