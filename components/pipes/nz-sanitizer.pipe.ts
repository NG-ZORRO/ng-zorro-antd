/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeStyle, SafeUrl } from '@angular/platform-browser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

type DomSanitizerType = 'html' | 'style' | 'url' | 'resourceUrl';

@Pipe({
  name: 'nzSanitizer'
})
export class NzSanitizerPipe implements PipeTransform {
  protected sanitizer = inject(DomSanitizer);

  transform(value: NzSafeAny, type: 'html'): SafeHtml;
  transform(value: NzSafeAny, type: 'style'): SafeStyle;
  transform(value: NzSafeAny, type: 'url'): SafeUrl;
  transform(value: NzSafeAny, type: 'resourceUrl'): SafeResourceUrl;
  transform(value: NzSafeAny, type: DomSanitizerType = 'html'): SafeHtml | SafeStyle | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified`);
    }
  }
}
