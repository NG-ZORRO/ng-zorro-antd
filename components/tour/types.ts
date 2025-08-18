/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ElementRef } from '@angular/core';

export interface NzTourStep {
  title: string;
  description: string;
  target?: Element | ElementRef<Element> | null | (() => Element | ElementRef<Element> | null);
  cover?: string;
  placement?: NzTourPlacement;
}

export const TourPlacements = [
  'left',
  'leftTop',
  'leftBottom',
  'right',
  'rightTop',
  'rightBottom',
  'top',
  'topLeft',
  'topRight',
  'bottom',
  'bottomLeft',
  'bottomRight',
  'center'
] as const;
export type NzTourPlacement = (typeof TourPlacements)[number];

export interface NzTourMaskGap {
  offset: number | [number, number];
  radius: number;
}

export const NZ_TOUR_MASK_GAP_DEFAULT = {
  offset: 6,
  radius: 2
};

export interface NzTourOptions {
  steps: NzTourStep[];
  zIndex?: number;
  mask?: boolean;
  placement?: NzTourPlacement;
  gap?: Partial<NzTourMaskGap>;
}
