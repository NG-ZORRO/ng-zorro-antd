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
  mask?: boolean | NzTourMaskOptions;
}

export interface NzTourMaskGap {
  offset: number | [number, number];
  radius: number;
}

export interface NzTourMaskOptions {
  color?: string;
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

export interface NzTourOptions {
  steps: NzTourStep[];
  zIndex?: number;
  mask?: boolean | NzTourMaskOptions;
  placement?: NzTourPlacement;
  gap?: Partial<NzTourMaskGap>;
}
