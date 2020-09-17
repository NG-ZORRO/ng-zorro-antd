import { NzToCssUnitPipe } from './nz-css-unit.pipe';

describe('NzToCssUnitPipe', () => {
  let pipe: NzToCssUnitPipe;

  beforeEach(() => {
    pipe = new NzToCssUnitPipe();
  });

  it('Should ToCssUnit', () => {
    expect(pipe.transform('100')).toEqual('100px');
  });

  it('Should ToCssUnit but typeof value is String', () => {
    expect(pipe.transform('100px')).toEqual('100px');
  });

  it('Should ToCssUnit but defaultUnit is defined', () => {
    expect(pipe.transform('100', 'pt')).toEqual('100pt');
  });

  it('Should ToCssUnit but defaultUnit is defined and typeof value is String', () => {
    expect(pipe.transform('100px', 'pt')).toEqual('100px');
  });

  // it('Should ToCssUnit but typeof value is null', () => {
  //   expect(pipe.transform(null)).toEqual('0px');
  // });
  //
  // it('Should ToCssUnit but typeof value is undefined', () => {
  //   expect(pipe.transform(undefined)).toEqual(undefined);
  // });
});
