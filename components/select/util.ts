/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * Builds the context of a template rendered for an item: the item as `$implicit` plus its own properties.
 */
export function getItemTemplateOutletContext(item: NzSafeAny): NzSafeAny {
  return { $implicit: item, ...item };
}
