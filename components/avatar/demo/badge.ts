/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-avatar-badge',
  template: `
    <nz-badge [nzCount]="5" style="margin-right: 24px;">
      <nz-avatar nzIcon="user" [nzShape]="'square'"></nz-avatar>
    </nz-badge>
    <nz-badge nzDot>
      <nz-avatar nzIcon="user" [nzShape]="'square'"></nz-avatar>
    </nz-badge>
  `
})
export class NzDemoAvatarBadgeComponent {}
