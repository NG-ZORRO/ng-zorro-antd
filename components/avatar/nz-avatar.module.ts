/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzAvatarComponent } from './nz-avatar.component';

@NgModule({
  declarations: [NzAvatarComponent],
  exports: [NzAvatarComponent],
  imports: [CommonModule, NzIconModule, PlatformModule]
})
export class NzAvatarModule {}
