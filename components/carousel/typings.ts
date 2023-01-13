/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { InjectionToken, NgZone, QueryList } from '@angular/core';

import { NzStringLiteralUnion } from 'ng-zorro-antd/core/types';

import { NzCarouselContentDirective } from './carousel-content.directive';
import { NzCarouselBaseStrategy } from './strategies/base-strategy';

export type NzCarouselEffects = NzStringLiteralUnion<'fade' | 'scrollx'>;
export type NzCarouselDotPosition = NzStringLiteralUnion<'top' | 'bottom' | 'left' | 'right'>;

export interface NzCarouselComponentAsSource {
  carouselContents: QueryList<NzCarouselContentDirective>;
  el: HTMLElement;
  nzTransitionSpeed: number;
  vertical: boolean;
  slickListEl: HTMLElement;
  slickTrackEl: HTMLElement;
  activeIndex: number;
  dir: Direction;
  ngZone: NgZone;
}

export interface NzCarouselStrategyRegistryItem {
  name: string;
  strategy: NzCarouselBaseStrategy;
}

export const NZ_CAROUSEL_CUSTOM_STRATEGIES = new InjectionToken<NzCarouselStrategyRegistryItem[]>(
  'nz-carousel-custom-strategies'
);

export interface PointerVector {
  x: number;
  y: number;
}

export interface FromToInterface {
  from: number;
  to: number;
}
