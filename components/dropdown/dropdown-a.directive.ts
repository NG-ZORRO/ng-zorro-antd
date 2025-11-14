/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: 'a[nz-dropdown]',
  host: {
    class: 'ant-dropdown-link'
  }
})
export class NzDropdownADirective {}
