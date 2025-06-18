/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { NzSanitizerPipe } from './nz-sanitizer.pipe';

describe('NzSanitizerPipe', () => {
  let pipe: NzSanitizerPipe;
  const htmlSnippet = '<div><p>hello world</p><div>';
  const styleSnippet = 'height:50px;background-color: red';
  const urlSnippet = 'https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png';
  const responseUrlSnippet = 'https://www.aliyun.com/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    });
    pipe = TestBed.inject(NzSanitizerPipe);
  });

  it('Should sanitizer', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should sanitizer but type is html', () => {
    expect(pipe.transform(htmlSnippet, 'html')).toBeTruthy();
  });

  it('Should sanitizer but type is style', () => {
    expect(pipe.transform(styleSnippet, 'style')).toBeTruthy();
  });

  it('Should sanitizer but type is url', () => {
    expect(pipe.transform(urlSnippet, 'url')).toBeTruthy();
  });

  it('Should sanitizer but type is resourceUrl', () => {
    expect(pipe.transform(responseUrlSnippet, 'resourceUrl')).toBeTruthy();
  });
});
