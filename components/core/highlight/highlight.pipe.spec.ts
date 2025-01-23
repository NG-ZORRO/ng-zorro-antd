/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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

  it('should highlight HTML entities', () => {
    expect(pipe.transform('abc<>&"¢¥~®™Abc', 'a', 'igm')).toEqual(
      '<span>a</span>bc&lt;&gt;&amp;&#34;&#162;&#165;~&#174;&#8482;<span>A</span>bc'
    );
    expect(pipe.transform('<>&"¢¥~®™', '>', 'igm')).toEqual(
      '&lt;<span>&gt;</span>&amp;&#34;&#162;&#165;~&#174;&#8482;'
    );
    expect(pipe.transform('&forall;&nabla;&#8364;&#x20AC;', '&', 'g')).toEqual(
      '<span>&amp;</span>forall;<span>&amp;</span>nabla;<span>&amp;</span>#8364;<span>&amp;</span>#x20AC;'
    );
    expect(pipe.transform('e😀m😁o😂j🤣i', '😂j', 'g')).toEqual(
      'e&#128512;m&#128513;o<span>&#128514;j</span>&#129315;i'
    );
  });
});
