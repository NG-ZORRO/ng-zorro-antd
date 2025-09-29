/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { InjectionToken, NgZone, QueryList } from '@angular/core';

import { NzCarouselContentDirective } from './carousel-content.directive';
import { NzCarouselBaseStrategy } from './strategies/base-strategy';

export type NzCarouselEffects = 'fade' | 'scrollx' | string;
export type NzCarouselDotPosition = 'top' | 'bottom' | 'left' | 'right' | string;

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
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-carousel-custom-strategies' : ''
);

export interface PointerVector {
  x: number;
  y: number;
}

export interface FromToInterface {
  from: number;
  to: number;
}
