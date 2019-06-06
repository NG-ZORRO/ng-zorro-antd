/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[nz-select-unselectable]',
  exportAs: 'nzSelectUnselectable',
  host: {
    '[attr.unselectable]': '"unselectable"',
    '[style.user-select]': '"none"'
  }
})
export class NzSelectUnselectableDirective {}
