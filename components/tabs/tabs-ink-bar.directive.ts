/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Directive, ElementRef, NgZone, inject, input } from '@angular/core';

import { isAnimationEnabled } from 'ng-zorro-antd/core/animation';
import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';

import { NzTabPositionMode, type NzIndicator, type NzIndicatorAlign } from './interfaces';

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
  private readonly directionality = inject(Directionality).valueSignal;

  readonly position = input<NzTabPositionMode>('horizontal');
  readonly animated = input(true);
  readonly indicator = input<NzIndicator>();
  protected readonly animationEnabled = isAnimationEnabled(() => this.animated());

  alignToElement(element: HTMLElement): void {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.setStyles(element));
    });
  }

  private setStyles(element: HTMLElement): void {
    const { size, align } = this.indicator() || {};
    if (this.position() === 'horizontal') {
      this.el.style.top = '';
      this.el.style.height = '';
      this.el.style.width = coerceCssPixelValue(
        size ? (typeof size === 'number' ? size : size(element?.offsetWidth ?? 0)) : (element?.offsetWidth ?? 0)
      );
      this.el.style.left = this.setIndicatorPosition(element, align);
    } else {
      this.el.style.left = '';
      this.el.style.width = '';
      this.el.style.height = coerceCssPixelValue(
        size !== undefined && size !== null
          ? typeof size === 'number'
            ? size
            : size(element?.offsetHeight ?? 0)
          : (element?.offsetHeight ?? 0)
      );
      this.el.style.top = this.setIndicatorPosition(element, align);
    }
  }

  private setIndicatorPosition(element: HTMLElement, align: NzIndicatorAlign = 'start'): string {
    const isHorizontal = this.position() === 'horizontal';
    const itemOffset = isHorizontal ? (element?.offsetLeft ?? 0) : (element?.offsetTop ?? 0);
    const itemSize = isHorizontal ? (element?.offsetWidth ?? 0) : (element?.offsetHeight ?? 0);
    const indicatorSize = isHorizontal ? this.el.offsetWidth : this.el.offsetHeight;
    const isRtl = isHorizontal && this.directionality() === 'rtl';
    const resolvedAlign: NzIndicatorAlign = isRtl && align !== 'center' ? (align === 'start' ? 'end' : 'start') : align;

    switch (resolvedAlign) {
      case 'start':
        return coerceCssPixelValue(itemOffset);
      case 'end':
        return coerceCssPixelValue(itemOffset + itemSize - indicatorSize || 0);
      case 'center':
        return coerceCssPixelValue(itemOffset + (itemSize - indicatorSize) / 2 || 0);
    }
  }
}
