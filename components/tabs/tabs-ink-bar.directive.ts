/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Directive, ElementRef, Input, NgZone, OnDestroy, Optional, Renderer2 } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTabPositionMode } from './table.types';

@Directive({
  selector: '[nz-tabs-ink-bar]',
  exportAs: 'nzTabsInkBar',
  host: {
    '[class.ant-tabs-ink-bar-animated]': 'nzAnimated',
    '[class.ant-tabs-ink-bar-no-animated]': '!nzAnimated'
  }
})
export class NzTabsInkBarDirective implements OnDestroy {
  static ngAcceptInputType_nzAnimated: BooleanInput;

  @Input() @InputBoolean() nzAnimated = false;

  @Input() nzPositionMode: NzTabPositionMode = 'horizontal';

  dir: Direction;
  private readonly destroy$ = new Subject();

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    @Optional() directionality: Directionality
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-tabs-ink-bar');

    this.dir = directionality.value;
    directionality.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = directionality.value;
    });
  }

  alignToElement(element: HTMLElement): void {
    if (typeof requestAnimationFrame !== 'undefined') {
      this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => this.setStyles(element));
      });
    } else {
      this.setStyles(element);
    }
  }

  setStyles(element: HTMLElement): void {
    /** when horizontal remove height style and add transform left **/
    if (this.nzPositionMode === 'horizontal') {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'height');
      this.renderer.setStyle(this.elementRef.nativeElement, 'transform', `translate3d(${this.getLeftPosition(element)}, 0px, 0px)`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', this.getElementWidth(element));
    } else {
      /** when vertical remove width style and add transform top **/
      this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
      this.renderer.setStyle(this.elementRef.nativeElement, 'transform', `translate3d(0px, ${this.getTopPosition(element)}, 0px)`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.getElementHeight(element));
    }
  }

  getLeftPosition(element: HTMLElement): string {
    return element ? (this.dir === 'rtl' ? element.offsetLeft + 'px' : element.offsetLeft + 'px') : '0';
  }

  getElementWidth(element: HTMLElement): string {
    return element ? element.offsetWidth + 'px' : '0';
  }

  getTopPosition(element: HTMLElement): string {
    return element ? element.offsetTop + 'px' : '0';
  }

  getElementHeight(element: HTMLElement): string {
    return element ? element.offsetHeight + 'px' : '0';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
