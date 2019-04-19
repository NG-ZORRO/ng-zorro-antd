/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-presuffix',
  template: `
    <nz-input-group [nzSuffix]="suffixTemplate" [nzPrefix]="prefixTemplate">
      <input type="text" nz-input placeholder="Enter your username" />
    </nz-input-group>
    <ng-template #prefixTemplate><i nz-icon type="user"></i></ng-template>
    <ng-template #suffixTemplate><i nz-icon nz-tooltip nzTitle="Extra information" type="info-circle"></i></ng-template>
  `
})
export class NzDemoInputPresuffixComponent {}
