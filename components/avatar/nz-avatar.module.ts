import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzAvatarComponent } from './nz-avatar.component';

@NgModule({
  declarations: [NzAvatarComponent],
  exports: [NzAvatarComponent],
  imports: [CommonModule, NzIconModule]
})
export class NzAvatarModule {}
