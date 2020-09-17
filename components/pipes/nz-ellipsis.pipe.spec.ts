import { NzEllipsisPipe } from './nz-ellipsis.pipe';

describe('NzEllipsisPipe', () => {
  let pipe: NzEllipsisPipe;

  beforeEach(() => {
    pipe = new NzEllipsisPipe();
  });

  it('Should truncate', () => {
    expect(pipe.transform('Hello World', 4, '')).toEqual('Hell');
  });

  it('Should return the input', () => {
    expect(pipe.transform('Hello', 10)).toEqual('Hello');
  });
});
