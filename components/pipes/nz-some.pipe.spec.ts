import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzSomePipe } from './nz-some.pipe';

describe('NzSomePipe', () => {
  let pipe: NzSomePipe;

  const fn = (item: NzSafeAny) => {
    return item === 2;
  };

  beforeEach(() => {
    pipe = new NzSomePipe();
  });

  it('Should return true', () => {
    const array = [0, 1, 2, 3];

    expect(pipe.transform(array, fn)).toEqual(true);
    expect(array).toEqual([0, 1, 2, 3]); // Check integrity
  });

  it('Should return false', () => {
    expect(pipe.transform([1, 3], fn)).toEqual(false);
  });
});
