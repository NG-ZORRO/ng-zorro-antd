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

  it('Should trim other characters from string', () => {
    const result = pipe.transform('42foo bar4242', '42');
    expect(result).toEqual('foo bar');
  });
});
