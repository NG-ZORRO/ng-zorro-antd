/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-form-split',
  exportAs: 'nzFormSplit',
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content />`,
  host: {
    class: 'ant-form-split'
  }
})
export class NzFormSplitComponent {}
