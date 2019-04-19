/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CandyDate } from './candy-date';
import { isAllowedDate } from './util';

describe('util.ts coverage supplements', () => {
  it('should cover untouched branches', () => {
    const disabledDate = () => true;
    expect(isAllowedDate(new CandyDate(), disabledDate)).toBeFalsy();

    const disabledTime = () => {
      return {
        nzDisabledHours: () => [1],
        nzDisabledMinutes: () => [2],
        nzDisabledSeconds: () => [3]
      };
    };
    expect(isAllowedDate(new CandyDate('2000-11-11 01:11:11'), undefined, disabledTime)).toBeFalsy();
    expect(isAllowedDate(new CandyDate('2000-11-11 02:02:11'), undefined, disabledTime)).toBeFalsy();
    expect(isAllowedDate(new CandyDate('2000-11-11 02:03:03'), undefined, disabledTime)).toBeFalsy();
  });
});
