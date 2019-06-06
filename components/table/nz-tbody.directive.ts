/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Host, Optional } from '@angular/core';
import { NzTableComponent } from './nz-table.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'tbody',
  host: {
    '[class.ant-table-tbody]': 'nzTableComponent'
  }
})
export class NzTbodyDirective {
  constructor(@Host() @Optional() public nzTableComponent: NzTableComponent) {}
}
