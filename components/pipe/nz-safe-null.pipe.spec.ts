import { NzSafeNullPipe } from './nz-safe-null.pipe';

describe('NzSafeNullPipe', () => {
  let pipe: NzSafeNullPipe;

  beforeEach(() => {
    pipe = new NzSafeNullPipe();
  });

  it('Should safeNull', () => {
    expect(pipe.transform('Hello')).toEqual('Hello');
  });

  it('Should safeNull but replace', () => {
    expect(pipe.transform('Hello', '...')).toEqual('Hello');
  });

  it('Should safeNull but value is null', () => {
    expect(pipe.transform(null)).toEqual('');
  });

  it('Should safeNull but value is null and replace', () => {
    expect(pipe.transform(null, '-')).toEqual('-');
  });

  it('Should safeNull but value is undefined', () => {
    expect(pipe.transform(undefined)).toEqual('');
  });

  it('Should safeNull but value is undefined and replace', () => {
    expect(pipe.transform(undefined, '-')).toEqual('-');
  });
});
