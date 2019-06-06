/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, QueryList } from '@angular/core';
import { NzCarouselContentDirective } from './nz-carousel-content.directive';
import { NzCarouselBaseStrategy } from './strategies/base-strategy';

// Support string for custom transition effect.
export type NzCarouselEffects = 'fade' | 'scrollx' | string;

export interface NzCarouselComponentAsSource {
  carouselContents: QueryList<NzCarouselContentDirective>;
  el: HTMLElement;
  nzTransitionSpeed: number;
  nzVertical: boolean;
  slickListEl: HTMLElement;
  slickTrackEl: HTMLElement;
  activeIndex: number;
}

export interface PointerVector {
  x: number;
  y: number;
}

export interface FromToInterface {
  from: number;
  to: number;
}

export interface CarouselStrategyRegistryItem {
  name: string;
  strategy: NzCarouselBaseStrategy;
}

export const NZ_CAROUSEL_CUSTOM_STRATEGIES = new InjectionToken<CarouselStrategyRegistryItem[]>(
  'nz-carousel-custom-strategies'
);
