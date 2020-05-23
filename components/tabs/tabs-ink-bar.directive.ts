/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Directive, ElementRef, Inject, Input, NgZone, OnDestroy, Optional } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzTabPositionMode } from './interfaces';

@Directive({
  selector: 'nz-tabs-ink-bar, [nz-tabs-ink-bar]',
  host: {
    class: 'ant-tabs-ink-bar',
    '[class.ant-tabs-ink-bar-animated]': '_animated'
  }
})
export class NzTabsInkBarDirective implements OnDestroy {
  @Input() position: NzTabPositionMode = 'horizontal';
  @Input() animated = true;

  dir: Direction;
  private readonly destroy$ = new Subject();

  get _animated(): boolean {
    return this.animationMode !== 'NoopAnimations' && this.animated;
  }

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    @Optional() directionality: Directionality,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) public animationMode?: string
  ) {
    this.dir = directionality.value;
    directionality.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = directionality.value;
    });
  }

  alignToElement(element: HTMLElement): void {
    this.ngZone.runOutsideAngular(() => {
      reqAnimFrame(() => this.setStyles(element));
    });
  }

  setStyles(element: HTMLElement): void {
    const inkBar: HTMLElement = this.elementRef.nativeElement;

    if (this.position === 'horizontal') {
      inkBar.style.top = '';
      inkBar.style.height = '';
      inkBar.style.left = this.getLeftPosition(element);
      inkBar.style.width = this.getElementWidth(element);
    } else {
      inkBar.style.left = '';
      inkBar.style.width = '';
      inkBar.style.top = this.getTopPosition(element);
      inkBar.style.height = this.getElementHeight(element);
    }
  }

  getLeftPosition(element: HTMLElement): string {
    return element ? (this.dir === 'rtl' ? element.offsetLeft + 'px' : element.offsetLeft + 'px') : '0';
  }

  getElementWidth(element: HTMLElement): string {
    return element ? (element.offsetWidth || 0) + 'px' : '0';
  }

  getTopPosition(element: HTMLElement): string {
    return element ? (element.offsetTop || 0) + 'px' : '0';
  }

  getElementHeight(element: HTMLElement): string {
    return element ? (element.offsetHeight || 0) + 'px' : '0';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
