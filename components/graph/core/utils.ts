/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzZoomTransform } from '../interface';

/**
 * Calculate position and scale
 *
 * @param containerEle
 * @param targetEle
 * @param scale: if scale is set, skip calculate scale value
 */
export const calculateTransform = (
  containerEle: SVGSVGElement,
  targetEle: SVGGElement,
  scale?: number
): NzZoomTransform | null => {
  const containerEleSize = containerEle.getBoundingClientRect();
  const targetEleSize = targetEle.getBBox();
  if (!targetEleSize.width) {
    // There is no g element anymore.
    return null;
  }

  // TODO
  // leave some place when re-scale
  const scaleUnit = (containerEleSize.width - 48) / containerEleSize.width;
  const k =
    scale ||
    Math.min(containerEleSize.width / targetEleSize.width, containerEleSize.height / targetEleSize.height, 1) *
      scaleUnit;
  const x = (containerEleSize.width - targetEleSize.width * k) / 2;
  const y = (containerEleSize.height - targetEleSize.height * k) / 2;
  return {
    x,
    y,
    k
  };
};
