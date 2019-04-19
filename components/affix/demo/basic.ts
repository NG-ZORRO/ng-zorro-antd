/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-affix-basic',
  template: `
    <nz-affix>
      <button nz-button [nzType]="'primary'">
        <span>Affix top</span>
      </button>
    </nz-affix>
    <br />
    <nz-affix nzOffsetBottom="0">
      <button nz-button [nzType]="'primary'">
        <span>Affix bottom</span>
      </button>
    </nz-affix>
  `
})
export class NzDemoAffixBasicComponent {}
