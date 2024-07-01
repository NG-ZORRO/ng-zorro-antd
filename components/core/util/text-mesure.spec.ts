import { pxToNumber } from './text-measure';

describe('pxToNumber', () => {
  it('should return 0 when value is null', () => {
    expect(pxToNumber(null)).toBe(0);
  });
});
