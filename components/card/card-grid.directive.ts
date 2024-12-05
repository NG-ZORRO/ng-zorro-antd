/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input, booleanAttribute } from '@angular/core';

@Directive({
  selector: '[nz-card-grid]',
  exportAs: 'nzCardGrid',
  host: {
    class: 'ant-card-grid',
    '[class.ant-card-hoverable]': 'nzHoverable'
  }
})
export class NzCardGridDirective {
  @Input({ transform: booleanAttribute }) nzHoverable = true;
}
