/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSplitterCollapseOption, NzSplitterCollapsible } from './typings';

/**
 * Get the percentage value of the string. (e.g. '50%' => 0.5)
 * @param str
 */
export function getPercentValue(str: string): number {
  return Number(str.slice(0, -1)) / 100;
}

/**
 * Check if the size is percentage.
 * @param size
 */
export function isPercent(size: string | number | undefined): size is string {
  return typeof size === 'string' && size.endsWith('%');
}

/**
 * Coerce the panel collapsible option to the NzSplitterCollapseOption type.
 */
export function coerceCollapsible(collapsible: NzSplitterCollapsible): NzSplitterCollapseOption {
  if (collapsible && typeof collapsible === 'object') {
    return collapsible;
  }

  const mergedCollapsible = !!collapsible;
  return {
    start: mergedCollapsible,
    end: mergedCollapsible
  };
}
