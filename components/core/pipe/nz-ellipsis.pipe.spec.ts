import { NzEllipsisPipe } from './nz-ellipsis.pipe';

describe('NzEllipsisPipe', () => {
  let pipe: NzEllipsisPipe;

  beforeEach(() => {
    pipe = new NzEllipsisPipe();
  });

  it('Should truncate', () => {
    expect(pipe.transform('Hello World', 4, '', false)).toEqual('Hell');
  });

  it('Should truncate but preserve word', () => {
    expect(pipe.transform('Hello World', 4, '', true)).toEqual('Hello');
  });

  it('Should truncate but preserve word and add suffix', () => {
    expect(pipe.transform('Hello World', 4, '...', true)).toEqual('Hello...');
  });

  it('Should truncate but preserve word and add suffix', () => {
    expect(pipe.transform('Hello World, how is it going?', 14, '...', true)).toEqual('Hello World, how...');
  });

  it('Should preserve word', () => {
    expect(pipe.transform('aaaa', 2, '', true)).toEqual('aaaa');
  });

  it('Should return the input', () => {
    expect(pipe.transform('Hello', 10)).toEqual('Hello');
  });
});
