/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { fromEvent, Subject } from 'rxjs';
import { auditTime, takeUntil } from 'rxjs/operators';

import { responsiveMap, Breakpoint, IndexableObject, NzUpdateHostClassService } from 'ng-zorro-antd/core';

export type NzJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type NzAlign = 'top' | 'middle' | 'bottom';
export type NzType = 'flex' | null;

@Directive({
  selector: '[nz-row],nz-row',
  exportAs: 'nzRow',
  providers: [NzUpdateHostClassService]
})
export class NzRowDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() nzType: NzType;
  @Input() nzAlign: NzAlign = 'top';
  @Input() nzJustify: NzJustify = 'start';
  @Input() nzGutter: number | IndexableObject;
  private el: HTMLElement = this.elementRef.nativeElement;
  private prefixCls = 'ant-row';
  private breakPoint: Breakpoint;
  actualGutter: number;
  actualGutter$ = new Subject<number>();
  destroy$ = new Subject();

  calculateGutter(): number {
    if (typeof this.nzGutter !== 'object') {
      return this.nzGutter;
    } else if (this.breakPoint && this.nzGutter[this.breakPoint]) {
      return this.nzGutter[this.breakPoint];
    } else {
      return 0;
    }
  }

  updateGutter(): void {
    const actualGutter = this.calculateGutter();
    if (this.actualGutter !== actualGutter) {
      this.actualGutter = actualGutter;
      this.actualGutter$.next(this.actualGutter);
      this.renderer.setStyle(this.el, 'margin-left', `-${this.actualGutter / 2}px`);
      this.renderer.setStyle(this.el, 'margin-right', `-${this.actualGutter / 2}px`);
    }
  }

  watchMedia(): void {
    Object.keys(responsiveMap).map((screen: string) => {
      const castBP = screen as Breakpoint;
      const matchBelow = this.mediaMatcher.matchMedia(responsiveMap[castBP]).matches;
      if (matchBelow) {
        this.breakPoint = castBP;
      }
    });
    this.updateGutter();
  }

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
  setClassMap(): void {
    const classMap = {
      [`${this.prefixCls}`]: !this.nzType,
      [`${this.prefixCls}-${this.nzType}`]: this.nzType,
      [`${this.prefixCls}-${this.nzType}-${this.nzAlign}`]: this.nzType && this.nzAlign,
      [`${this.prefixCls}-${this.nzType}-${this.nzJustify}`]: this.nzType && this.nzJustify
    };
    this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
    public nzUpdateHostClassService: NzUpdateHostClassService,
    public mediaMatcher: MediaMatcher,
    public ngZone: NgZone,
    public platform: Platform
  ) {}

  ngOnInit(): void {
    this.setClassMap();
    this.watchMedia();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzType || changes.nzAlign || changes.nzJustify) {
      this.setClassMap();
    }
    if (changes.nzGutter) {
      this.updateGutter();
    }
  }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        fromEvent(window, 'resize')
          .pipe(
            auditTime(16),
            takeUntil(this.destroy$)
          )
          .subscribe(() => this.watchMedia());
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
