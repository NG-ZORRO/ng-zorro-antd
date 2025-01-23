/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzTrimPipe } from './nz-trim.pipe';

describe('NzTrimPipe', () => {
  let pipe: NzTrimPipe;

  beforeEach(() => {
    pipe = new NzTrimPipe();
  });

  it('Should trim whitespace from string', () => {
    const result = pipe.transform('   foo bar   ');
    expect(result).toEqual('foo bar');
  });
});
