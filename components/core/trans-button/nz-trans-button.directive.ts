/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: 'button[nz-trans-button]',
  host: {
    '[style.border]': '"0"',
    '[style.background]': '"transparent"',
    '[style.padding]': '"0"',
    '[style.line-height]': '"inherit"'
  }
})
export class NzTransButtonDirective {}
