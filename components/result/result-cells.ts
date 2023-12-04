/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: 'div[nz-result-title]',
  exportAs: 'nzResultTitle',
  host: {
    class: 'ant-result-title'
  },
  standalone: true
})
export class NzResultTitleDirective {}

@Directive({
  selector: 'div[nz-result-subtitle]',
  exportAs: 'nzResultSubtitle',
  host: {
    class: 'ant-result-subtitle'
  },
  standalone: true
})
export class NzResultSubtitleDirective {}

@Directive({
  selector: 'i[nz-result-icon], div[nz-result-icon]',
  exportAs: 'nzResultIcon',
  standalone: true
})
export class NzResultIconDirective {}

@Directive({
  selector: 'div[nz-result-content]',
  exportAs: 'nzResultContent',
  host: {
    class: 'ant-result-content'
  },
  standalone: true
})
export class NzResultContentDirective {}

@Directive({
  selector: 'div[nz-result-extra]',
  exportAs: 'nzResultExtra',
  host: {
    class: 'ant-result-extra'
  },
  standalone: true
})
export class NzResultExtraDirective {}
