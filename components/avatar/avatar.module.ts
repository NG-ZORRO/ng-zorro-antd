/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzAvatarGroupComponent } from './avatar-group.component';
import { NzAvatarComponent } from './avatar.component';

@NgModule({
  exports: [NzAvatarComponent, NzAvatarGroupComponent],
  imports: [NzAvatarComponent, NzAvatarGroupComponent]
})
export class NzAvatarModule {}
