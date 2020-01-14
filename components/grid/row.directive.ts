/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { gridResponsiveMap, IndexableObject, NzBreakpointKey, NzDomEventService } from 'ng-zorro-antd/core';
import { ReplaySubject, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

export type NzJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type NzAlign = 'top' | 'middle' | 'bottom';

@Directive({
  selector: '[nz-row],nz-row,nz-form-item',
  exportAs: 'nzRow',
  host: {
    '[class.ant-row]': `true`,
    '[class.ant-row-top]': `nzAlign === 'top'`,
    '[class.ant-row-middle]': `nzAlign === 'middle'`,
    '[class.ant-row-bottom]': `nzAlign === 'bottom'`,
    '[class.ant-row-start]': `nzJustify === 'start'`,
    '[class.ant-row-end]': `nzJustify === 'end'`,
    '[class.ant-row-center]': `nzJustify === 'center'`,
    '[class.ant-row-space-around]': `nzJustify === 'space-around'`,
    '[class.ant-row-space-between]': `nzJustify === 'space-between'`
  }
})
export class NzRowDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  /**
   * @deprecated don't need nzType="flex" after 9.0
   */
  @Input() nzType: 'flex' | null;
  @Input() nzAlign: NzAlign | null = null;
  @Input() nzJustify: NzJustify | null = null;
  @Input() nzGutter: number | IndexableObject | [number, number] | [IndexableObject, IndexableObject] | null = null;
  actualGutter$ = new ReplaySubject<[number, number]>(1);
  destroy$ = new Subject();

  getGutter(breakPoint: NzBreakpointKey): [number, number] {
    const results: [number, number] = [0, 0];
    const gutter = this.nzGutter || 0;
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        results[index] = (g![breakPoint] as number) || 0;
      } else {
        results[index] = g || 0;
      }
    });
    return results;
  }

  setGutterStyle(): void {
    let breakPoint: NzBreakpointKey | null = null;
    Object.keys(gridResponsiveMap).map((screen: string) => {
      const bp = screen as NzBreakpointKey;
      if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches) {
        breakPoint = bp;
      }
    });
    const [horizontalGutter, verticalGutter] = this.getGutter(breakPoint!);
    this.actualGutter$.next([horizontalGutter, verticalGutter]);
    const renderGutter = (name: string, gutter: number) => {
      const nativeElement = this.elementRef.nativeElement;
      this.renderer.setStyle(nativeElement, name, `-${gutter / 2}px`);
    };
    if (horizontalGutter > 0) {
      renderGutter('margin-left', horizontalGutter);
      renderGutter('margin-right', horizontalGutter);
    }
    if (verticalGutter > 0) {
      renderGutter('margin-top', verticalGutter);
      renderGutter('margin-bottom', verticalGutter);
    }
  }
  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
    public mediaMatcher: MediaMatcher,
    public ngZone: NgZone,
    public platform: Platform,
    private nzDomEventService: NzDomEventService
  ) {}

  ngOnInit(): void {
    this.setGutterStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzGutter) {
      this.setGutterStyle();
    }
  }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      this.nzDomEventService
        .registerResizeListener()
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.nzDomEventService.unregisterResizeListener())
        )
        .subscribe(() => this.setGutterStyle());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
