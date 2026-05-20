/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { MediaMatcher } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { NzResizeService } from './resize';

export enum NzBreakpointEnum {
  xxl = 'xxl',
  xl = 'xl',
  lg = 'lg',
  md = 'md',
  sm = 'sm',
  xs = 'xs'
}

export const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;
export type Breakpoint = (typeof responsiveArray)[number];

export type ResponsiveLike<T> = {
  [key in Breakpoint]: T;
};

export type BreakpointMap = ResponsiveLike<string>;
export type BreakpointBooleanMap = ResponsiveLike<boolean>;
/**
 * @deprecated intended to be removed in v22, please use {@link Breakpoint} instead
 */
export type NzBreakpointKey = Breakpoint;

export const gridResponsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};

export const siderResponsiveMap: BreakpointMap = {
  xs: '(max-width: 479.98px)',
  sm: '(max-width: 575.98px)',
  md: '(max-width: 767.98px)',
  lg: '(max-width: 991.98px)',
  xl: '(max-width: 1199.98px)',
  xxl: '(max-width: 1599.98px)'
};

@Injectable({
  providedIn: 'root'
})
export class NzBreakpointService {
  private readonly resizeService = inject(NzResizeService);
  private readonly mediaMatcher = inject(MediaMatcher);

  constructor() {
    this.resizeService.connect().pipe(takeUntilDestroyed()).subscribe();
  }

  subscribe(breakpointMap: BreakpointMap): Observable<NzBreakpointEnum>;
  subscribe(breakpointMap: BreakpointMap, fullMap: true): Observable<BreakpointBooleanMap>;
  subscribe(breakpointMap: BreakpointMap, fullMap?: true): Observable<NzBreakpointEnum | BreakpointBooleanMap> {
    if (fullMap) {
      return this.resizeService.connect().pipe(
        startWith(void 0),
        map(() => this.matchMedia(breakpointMap, true)),
        distinctUntilChanged((x, y) => x[0] === y[0]),
        map(x => x[1])
      );
    } else {
      return this.resizeService.connect().pipe(
        startWith(void 0),
        map(() => this.matchMedia(breakpointMap)),
        distinctUntilChanged()
      );
    }
  }

  private matchMedia(breakpointMap: BreakpointMap): NzBreakpointEnum;
  private matchMedia(breakpointMap: BreakpointMap, fullMap: true): [NzBreakpointEnum, BreakpointBooleanMap];
  private matchMedia(
    breakpointMap: BreakpointMap,
    fullMap?: true
  ): NzBreakpointEnum | [NzBreakpointEnum, BreakpointBooleanMap] {
    let bp = NzBreakpointEnum.md;

    const breakpointBooleanMap: Partial<BreakpointBooleanMap> = {};

    Object.keys(breakpointMap).map(breakpoint => {
      const castBP = breakpoint as NzBreakpointEnum;
      const matched = this.mediaMatcher.matchMedia(gridResponsiveMap[castBP]).matches;

      breakpointBooleanMap[castBP] = matched;

      if (matched) {
        bp = castBP;
      }
    });

    if (fullMap) {
      return [bp, breakpointBooleanMap as BreakpointBooleanMap];
    } else {
      return bp;
    }
  }
}
