import { inject, TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NzSanitizerPipe } from './nz-sanitizer.pipe';

describe('NzSanitizerPipe', () => {
  const htmlSnippet = '<div><p>hello world</p><div>';
  const scriptSnippet = "<script>window.alert('90')</script>";
  const styleSnippet = 'height:50px;background-color: red';
  const urlSnippet = 'https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png';
  const responseUrlSnippet = 'https://www.aliyun.com/';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    });
  });

  it('Should sanitizer', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: NzSanitizerPipe = new NzSanitizerPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));

  it('Should sanitizer but type is html', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: NzSanitizerPipe = new NzSanitizerPipe(domSanitizer);
    expect(pipe.transform(htmlSnippet, 'html')).toBeTruthy();
  }));

  it('Should sanitizer but type is script', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: NzSanitizerPipe = new NzSanitizerPipe(domSanitizer);
    expect(pipe.transform(scriptSnippet, 'script')).toBeTruthy();
  }));

  it('Should sanitizer but type is style', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: NzSanitizerPipe = new NzSanitizerPipe(domSanitizer);
    expect(pipe.transform(styleSnippet, 'style')).toBeTruthy();
  }));

  it('Should sanitizer but type is url', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: NzSanitizerPipe = new NzSanitizerPipe(domSanitizer);
    expect(pipe.transform(urlSnippet, 'url')).toBeTruthy();
  }));

  it('Should sanitizer but type is resourceUrl', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe: NzSanitizerPipe = new NzSanitizerPipe(domSanitizer);
    expect(pipe.transform(responseUrlSnippet, 'resourceUrl')).toBeTruthy();
  }));

  // it('Should sanitizer but type is other', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
  //   const pipe: NzSanitizerPipe = new NzSanitizerPipe(domSanitizer);
  //   expect(pipe.transform(htmlSnippet, 'html2')).toBeFalsy();
  // }));
});
