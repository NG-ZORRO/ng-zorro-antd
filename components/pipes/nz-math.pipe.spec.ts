import { EMathMethod, NzMathPipe } from './nz-math.pipe';

describe('NzMathPipe', () => {
  let nzMathPipe: NzMathPipe;

  beforeEach(() => {
    nzMathPipe = new NzMathPipe();
  });
  it('Should return 4', () => {
    expect(nzMathPipe.transform([1, 2, 3, 4], EMathMethod.MAX)).toEqual(4);
  });

  it('Should return 1', () => {
    expect(nzMathPipe.transform([1], EMathMethod.MAX)).toEqual(1);
  });

  it('Should return 1', () => {
    expect(nzMathPipe.transform([1, 1], EMathMethod.MAX)).toEqual(1);
  });

  it('Should return undefined', () => {
    expect(nzMathPipe.transform([], EMathMethod.MAX)).toBeUndefined();
  });

  it('Should return 1', () => {
    expect(nzMathPipe.transform([1, 2, 3, 4], EMathMethod.MIN)).toEqual(1);
  });

  it('Should return 2', () => {
    expect(nzMathPipe.transform([4, 3, 2, 5], EMathMethod.MIN)).toEqual(2);
  });

  it('Should return 1', () => {
    expect(nzMathPipe.transform([1], EMathMethod.MIN)).toEqual(1);
  });

  it('Should return 1', () => {
    expect(nzMathPipe.transform([1, 1], EMathMethod.MIN)).toEqual(1);
  });

  it('Should return undefined', () => {
    expect(nzMathPipe.transform([], EMathMethod.MIN)).toBeUndefined();
  });

  it('Should return 10', () => {
    expect(nzMathPipe.transform([1, 2, 3, 4], EMathMethod.SUM)).toEqual(10);
  });

  it('Should return 1', () => {
    expect(nzMathPipe.transform([1], EMathMethod.SUM)).toEqual(1);
  });

  it('Should return 2', () => {
    expect(nzMathPipe.transform([1, 1], EMathMethod.SUM)).toEqual(2);
  });

  it('Should return 2.5', () => {
    expect(nzMathPipe.transform([1, 2, 3, 4], EMathMethod.AVG)).toEqual(2.5);
  });

  it('Should return 1', () => {
    expect(nzMathPipe.transform([1], EMathMethod.AVG)).toEqual(1);
  });

  it('Should return 1', () => {
    expect(nzMathPipe.transform([1, 1], EMathMethod.AVG)).toEqual(1);
  });

  it('Should return undefined', () => {
    expect(nzMathPipe.transform([], EMathMethod.AVG)).toBeUndefined();
  });
});
