/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { computed, Directive, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ResponsiveLike, NzBreakpointKey, gridResponsiveMap, NzBreakpointService } from 'ng-zorro-antd/core/services';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { generateClassName, isNotNil, isNumber, isPlainObject } from 'ng-zorro-antd/core/util';

export type NzJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
export type NzAlign = 'top' | 'middle' | 'bottom' | 'stretch';
export type Gutter = number | string | undefined | Partial<ResponsiveLike<number | string>>;

type Gap = number | string | undefined;

const CLASS_NAME = 'ant-row';

@Directive({
  selector: '[nz-row],nz-row,nz-form-item',
  exportAs: 'nzRow',
  host: {
    class: 'ant-row',
    '[class]': `flexClass() + ' ' + alignClass()`,
    '[class.ant-row-rtl]': `dir() === 'rtl'`,
    '[style]': `gutterStyle()`
  }
})
export class NzRowDirective {
  private readonly mediaMatcher = inject(MediaMatcher);
  private readonly platform = inject(Platform);
  private readonly breakpointService = inject(NzBreakpointService);
  protected readonly dir = inject(Directionality).valueSignal;

  readonly nzAlign = input<NzAlign | null>(null);
  readonly nzJustify = input<NzJustify | null>(null);
  readonly nzGutter = input<Gutter | [Gutter, Gutter] | null>(undefined);

  /**
   * Internal signal tracking the current breakpoint.
   * Used to trigger recomputation of responsive gutters when viewport changes.
   */
  private readonly currentBreakpoint = this.platform.isBrowser
    ? toSignal(this.breakpointService.subscribe(gridResponsiveMap))
    : signal(undefined);

  protected readonly alignClass = computed<string>(() => {
    const align = this.nzAlign();
    return isNotNil(align) ? this.generateClass(align) : '';
  });

  protected readonly flexClass = computed<string>(() => {
    const justify = this.nzJustify();
    return isNotNil(justify) ? this.generateClass(justify) : '';
  });

  readonly gutter = computed<[Gap, Gap]>(() => {
    // Subscribe to breakpoint changes so this computed recomputes on viewport resize
    this.currentBreakpoint();

    const results: [Gap, Gap] = [undefined, undefined];
    const gutter = this.nzGutter() ?? 0;
    const normalizedGutter = Array.isArray(gutter) ? gutter : ([gutter, undefined] as [Gutter, Gutter]);
    normalizedGutter.forEach((g, index) => {
      if (isPlainObject(g)) {
        Object.keys(gridResponsiveMap).map(screen => {
          const bp = screen as NzBreakpointKey;
          if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches && g[bp]) {
            results[index] = g[bp];
          }
        });
      } else {
        results[index] = g;
      }
    });
    return results;
  });

  protected readonly gutterStyle = computed<NgStyleInterface>(() => {
    const [gutterH, gutterV] = this.gutter();
    const style: NgStyleInterface = {};

    if (gutterH) {
      const horizontalGutter = isNumber(gutterH) ? coerceCssPixelValue(gutterH / -2) : `calc(${gutterH} / -2)`;
      style['margin-inline'] = horizontalGutter;
    }

    style['row-gap'] = coerceCssPixelValue(gutterV);

    return style;
  });

  private generateClass(suffix: string): string {
    return generateClassName(CLASS_NAME, suffix);
  }
}
