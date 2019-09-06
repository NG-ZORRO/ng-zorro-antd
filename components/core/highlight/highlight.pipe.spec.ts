import { NzHighlightPipe } from './highlight.pipe';

describe('NzHighlightPipe', () => {
  let pipe: NzHighlightPipe;

  beforeEach(() => {
    pipe = new NzHighlightPipe();
  });

  it('should return highlight tag', () => {
    expect(pipe.transform('Ant Design of Angular', 'Angular')).toEqual('Ant Design of <span>Angular</span>');
    expect(pipe.transform('Ant Design of Angular', 'Ant')).toEqual('<span>Ant</span> Design of Angular');
  });

  it('should highlight when there is a new value', () => {
    expect(pipe.transform('Ant Design of Angular', 'Angular')).toEqual('Ant Design of <span>Angular</span>');
    expect(pipe.transform('ng-zorro-antd', 'ng')).toEqual('<span>ng</span>-zorro-antd');
  });

  it('should renter origin value when highlight value is falsely', () => {
    expect(pipe.transform('Ant Design of Angular', '')).toEqual('Ant Design of Angular');
  });

  it('should flags work', () => {
    expect(pipe.transform('Ant Design of Angular', 'a', 'ig')).toEqual(
      '<span>A</span>nt Design of <span>A</span>ngul<span>a</span>r'
    );
  });

  it('should class work', () => {
    expect(pipe.transform('Ant Design of Angular', 'Angular', '', 'highlight')).toEqual(
      'Ant Design of <span class="highlight">Angular</span>'
    );
  });

  it('should escapes regex keyword', () => {
    expect(
      pipe.transform(
        'Escapes of characters (\\, *, +, ?, |, {, [, (,), ^, $, ., #, and white space)',
        '(\\, *, +, ?, |, {, [, (,), ^, $, ., #, and white space)'
      )
    ).toEqual('Escapes of characters <span>(\\, *, +, ?, |, {, [, (,), ^, $, ., #, and white space)</span>');
  });

  it('should encode HTML tags', () => {
    expect(pipe.transform('<script>alert("hello")</script>', '<script>alert("he')).toEqual(
      '<span>&lt;script&gt;alert(&#34;he</span>llo&#34;)&lt;/script&gt;'
    );
  });
});
