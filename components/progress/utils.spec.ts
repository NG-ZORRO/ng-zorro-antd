/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { handleCircleGradient, handleLinearGradient } from './utils';

// https://github.com/ant-design/ant-design/blob/330a952a988a4ae18c201b464c51d5faeb714f7c/components/progress/__tests__/index.test.js#L74-L88.
describe('progress util functions', () => {
  it('get correct line-gradient', () => {
    expect(handleLinearGradient({ from: 'test', to: 'test' })).toBe('linear-gradient(to right, test, test)');
    expect(handleLinearGradient({})).toBe('linear-gradient(to right, #1890ff, #1890ff)');
    expect(handleLinearGradient({ from: 'test', to: 'test', '0%': 'test' })).toBe('linear-gradient(to right, test 0%)');
  });

  it('get correct circle gradient', () => {
    const gradientOne = handleCircleGradient({ '10%': 'test10', '30%': 'test30', '20%': 'test20' });
    expect(gradientOne[0].color).toBe('test10');
    expect(gradientOne[0].offset).toBe('10%');
    expect(gradientOne[1].color).toBe('test20');
    expect(gradientOne[1].offset).toBe('20%');
  });
});
