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

export type BreakpointMap = Record<NzBreakpointEnum, string>;
export type BreakpointBooleanMap = Record<NzBreakpointEnum, boolean>;
export type NzBreakpointKey = keyof typeof NzBreakpointEnum;

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
  private resizeService = inject(NzResizeService);
  private mediaMatcher = inject(MediaMatcher);

  constructor() {
    this.resizeService
      .connect()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {});
  }

  subscribe(breakpointMap: BreakpointMap): Observable<NzBreakpointEnum>;
  subscribe(breakpointMap: BreakpointMap, fullMap: true): Observable<BreakpointBooleanMap>;
  subscribe(breakpointMap: BreakpointMap, fullMap?: true): Observable<NzBreakpointEnum | BreakpointBooleanMap> {
    if (fullMap) {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const get = () => this.matchMedia(breakpointMap, true);
      return this.resizeService.connect().pipe(
        map(get),
        startWith(get()),
        distinctUntilChanged(
          (x: [NzBreakpointEnum, BreakpointBooleanMap], y: [NzBreakpointEnum, BreakpointBooleanMap]) => x[0] === y[0]
        ),
        map(x => x[1])
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const get = () => this.matchMedia(breakpointMap);
      return this.resizeService.connect().pipe(map(get), startWith(get()), distinctUntilChanged());
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

      breakpointBooleanMap[breakpoint as NzBreakpointEnum] = matched;

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
