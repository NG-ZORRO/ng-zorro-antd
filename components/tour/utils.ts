/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzTourMaskOptions } from 'ng-zorro-antd/tour/types';

import { NZ_TOUR_MASK_DEFAULT_COLOR } from './constant';

export const enum ElementSides {
  Top,
  Bottom,
  All
}
export function isInViewport(htmlElement: HTMLElement, sidesToCheck: ElementSides = ElementSides.All): boolean {
  const viewportWidth = window.innerWidth,
    viewportHeight = window.innerHeight,
    boundingRectangle = htmlElement.getBoundingClientRect(),
    areCornersInViewport = boundingRectangle.left >= 0 && boundingRectangle.right <= viewportWidth,
    isTopInViewport = boundingRectangle.top >= 0,
    isBottomInViewport = boundingRectangle.bottom <= viewportHeight;

  if (sidesToCheck === ElementSides.Top) {
    return isTopInViewport && areCornersInViewport;
  }
  if (sidesToCheck === ElementSides.Bottom) {
    return isBottomInViewport && areCornersInViewport;
  }

  return isTopInViewport && isBottomInViewport && areCornersInViewport;
}

export function normalizeMaskColor(mask: boolean | NzTourMaskOptions): string {
  return typeof mask === 'boolean' ? NZ_TOUR_MASK_DEFAULT_COLOR : mask.color || NZ_TOUR_MASK_DEFAULT_COLOR;
}

export function normalizeGapOffset(offset: number | [number, number]): [number, number] {
  return Array.isArray(offset) ? offset : [offset, offset];
}
