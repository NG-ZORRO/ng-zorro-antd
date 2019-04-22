/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CascaderOption } from './nz-cascader-definitions';

export function isChildOption(o: CascaderOption): boolean {
  return o.isLeaf || !o.children || !o.children.length;
}

export function isParentOption(o: CascaderOption): boolean {
  return !!o.children && !!o.children.length && !o.isLeaf;
}
