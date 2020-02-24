import { DomSanitizer } from '@angular/platform-browser';
import { NzSanitizerPipe } from './nz-sanitizer.pipe';

describe('NzSanitizerPipe', () => {
  let pipe: NzSanitizerPipe;
  beforeEach(() => {
    let sanitizer: DomSanitizer;
    // @ts-ignore
    sanitizer = new DomSanitizer();
    pipe = new NzSanitizerPipe(sanitizer);
  });

  it('Should sanitizer', () => {
    const htmlSnippet = "<script>window.alert('90')</script>";
    expect(pipe.transform(htmlSnippet, 'html')).toBeTruthy();
  });
});
