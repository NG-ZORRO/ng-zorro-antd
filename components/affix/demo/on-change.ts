/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-affix-on-change',
  template: `
    <nz-affix [nzOffsetTop]="120" (nzChange)="onChange($event)">
      <button nz-button>
        <span>120px to affix top</span>
      </button>
    </nz-affix>
  `
})
export class NzDemoAffixOnChangeComponent {
  onChange(status: boolean) {
    console.log(status);
  }
}
