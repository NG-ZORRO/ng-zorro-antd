/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-header',
  exportAs: 'nzHeader',
  template: `<ng-content />`,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-layout-header'
  }
})
export class NzHeaderComponent {}
