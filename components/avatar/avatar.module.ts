/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzAvatarGroupComponent } from './avatar-group.component';
import { NzAvatarComponent } from './avatar.component';

@NgModule({
  declarations: [NzAvatarComponent, NzAvatarGroupComponent],
  exports: [NzAvatarComponent, NzAvatarGroupComponent],
  imports: [CommonModule, NzIconModule, PlatformModule]
})
export class NzAvatarModule {}
