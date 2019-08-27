import { handleLinearGradient, sortGradient } from './nz-progress-utils';

// https://github.com/ant-design/ant-design/blob/330a952a988a4ae18c201b464c51d5faeb714f7c/components/progress/__tests__/index.test.js#L74-L88.
describe('util functions', () => {
  it('get correct line-gradient', () => {
    expect(handleLinearGradient({ from: 'test', to: 'test' })).toBe('linear-gradient(to right, test, test)');
    expect(handleLinearGradient({})).toBe('linear-gradient(to right, #1890ff, #1890ff)');
    expect(handleLinearGradient({ from: 'test', to: 'test', '0%': 'test' })).toBe('linear-gradient(to right, test 0%)');
  });

  it('sort gradients correctly', () => {
    expect(sortGradient({ '10%': 'test10', '30%': 'test30', '20%': 'test20' })).toBe(
      'test10 10%, test20 20%, test30 30%'
    );
  });
});
