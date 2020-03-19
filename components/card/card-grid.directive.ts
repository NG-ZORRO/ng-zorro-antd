/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Directive({
  selector: '[nz-card-grid]',
  exportAs: 'nzCardGrid',
  host: {
    '[class.ant-card-grid]': 'true',
    '[class.ant-card-hoverable]': 'nzHoverable'
  }
})
export class NzCardGridDirective {
  @Input() @InputBoolean() nzHoverable = true;
}
