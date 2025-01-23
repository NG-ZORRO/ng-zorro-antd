/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { pxToNumber } from './text-measure';

describe('pxToNumber', () => {
  it('should return 0 when value is null', () => {
    expect(pxToNumber(null)).toBe(0);
  });
});
