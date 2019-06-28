/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: 'nz-result-title, [nz-result-title]',
  exportAs: 'nzResultTitle',
  host: {
    class: 'ant-result-title-view-title'
  }
})
export class NzResultTitleDirective {}

@Directive({
  selector: 'nz-result-subtitle, [nz-result-subtitle]',
  exportAs: 'nzResultSubtitle',
  host: {
    class: 'ant-result-title-view-subtitle'
  }
})
export class NzResultSubtitleDirective {}

@Directive({
  selector: '[nz-result-icon]',
  exportAs: 'nzResultIcon'
})
export class NzResultIconDirective {}

@Directive({
  selector: 'nz-result-content, [nz-result-content]',
  exportAs: 'nzResultContent',
  host: {
    class: 'ant-result-content'
  }
})
export class NzResultContentDirective {}

@Directive({
  selector: 'nz-result-extra, [nz-result-extra]',
  exportAs: 'nzResultExtra',
  host: {
    class: 'ant-result-extra-view'
  }
})
export class NzResultExtraDirective {}
