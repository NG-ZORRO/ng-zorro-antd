/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export function getMaxZIndex(target: string, basicZIndex: number = 1000): number {
  const matches = document.querySelectorAll(target);
  let maxZIndex = basicZIndex;
  matches.forEach(el => {
    const zindex = parseInt(window.getComputedStyle(el).getPropertyValue('z-index'), 10);
    maxZIndex = Math.max(maxZIndex, zindex);
  });
  return maxZIndex + 1;
}
