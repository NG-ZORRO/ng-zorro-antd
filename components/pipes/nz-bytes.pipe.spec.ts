import { ByteUnit, NzBytesPipe } from './nz-bytes.pipe';

describe('NzBytesPipe', () => {
  let pipe: NzBytesPipe;

  beforeEach(() => {
    pipe = new NzBytesPipe();
  });

  it('Should return 120 B', () => {
    const result = pipe.transform(120, 0);
    expect(result).toEqual('120 B');
  });

  it('Should return 465 B', () => {
    const result = pipe.transform(465.56791, 2);
    expect(result).toEqual('465 B');
  });

  it('Should return 50 B', () => {
    const result = pipe.transform(55.5, 1);
    expect(result).toEqual('50 B');
  });

  it('Should return 9 kB', () => {
    const result = pipe.transform(1024, 0);
    expect(result).toEqual('9 kB');
  });

  it('Should return 1 kB', () => {
    const result = pipe.transform(1, 0, 'kB');
    expect(result).toEqual('1 kB');
  });

  it('Should return 1 kB #3', () => {
    const result = pipe.transform(1, 0, 'KB');
    expect(result).toEqual('1 kB');
  });

  it('Should return 345 kB, #1', () => {
    const kB = 1024 * 345;
    const result = pipe.transform(kB, 0);
    expect(result).toEqual('345 kB');
  });

  it('Should return 345 kB, #2', () => {
    const result = pipe.transform(345, 0, 'kB');
    expect(result).toEqual('345 kB');
  });

  it('Should return 666 kB, #3', () => {
    const result = pipe.transform(666, 0, 'KB');
    expect(result).toEqual('666 kB');
  });

  it('Should return 1023 kB', () => {
    const kB = 1024 * 1023;
    const result = pipe.transform(kB, 0);
    expect(result).toEqual('1023 kB');
  });

  it('Should return 241 MB, #1', () => {
    const mb = 1024 * 1024 * 240.5691;
    const result = pipe.transform(mb, 0);
    expect(result).toEqual('241 MB');
  });

  it('Should return 241 MB, #2', () => {
    const mb = 240.5691 / 1024;
    const result = pipe.transform(mb, 0, 'GB');
    expect(result).toEqual('241 MB');
  });

  it('Should return 240.54 MB', () => {
    const mb = 1024 * 1024 * 240.5411;
    const result = pipe.transform(mb, 2);
    expect(result).toEqual('240.54 MB');
  });

  it('Should return 1023 MB, #1', () => {
    const mb = 1024 * 1024 * 1023;
    const result = pipe.transform(mb, 2);
    expect(result).toEqual('1023 MB');
  });

  it('Should return 1023 MB, #2', () => {
    const kB = 1024 * 1023;
    const result = pipe.transform(kB, 2, 'kB');
    expect(result).toEqual('1023 MB');
  });

  it('Should return 1023 GB', () => {
    const gb = 1024 * 1024 * 1024 * 1023;
    const result = pipe.transform(gb, 2);
    expect(result).toEqual('1023 GB');
  });

  it('Should return 1.03 TB', () => {
    const gb = 1024 * 1024 * 1024 * 1059;
    const result = pipe.transform(gb, 2);
    expect(result).toEqual('1.03 TB');
  });

  it('Should return the input', () => {
    expect(pipe.transform('a')).toEqual('a');
  });

  it('Should return 100 TB', () => {
    const bytes = 100;
    const unit = 'TB';
    const result = NzBytesPipe.formatResult(bytes, unit);
    expect(result).toEqual('100 TB');
  });

  it('Should return 1', () => {
    const format = { max: Math.pow(1024, 4), prev: 'MB' as ByteUnit };
    const bytes = 1024 * 1024 * 1024;
    const result = NzBytesPipe.calculateResult(format, bytes);
    expect(result).toEqual(1);
  });

  it('Should return 1024 MB, set output unit', () => {
    const bytes = 1024 * 1024 * 1024;
    const from = 'B' as ByteUnit;
    const to = 'MB' as ByteUnit;
    const result = pipe.transform(bytes, 0, from, to);
    expect(result).toEqual('1024 MB');
  });

  it('Should return 1024 MB, from & to units are equals', () => {
    const bytes = 1024;
    const from = 'MB' as ByteUnit;
    const to = 'MB' as ByteUnit;
    const result = pipe.transform(bytes, 0, from, to);
    expect(result).toEqual('1024 MB');
  });
});
