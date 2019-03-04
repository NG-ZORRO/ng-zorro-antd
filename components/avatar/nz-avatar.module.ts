import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzAvatarComponent } from './nz-avatar.component';

@NgModule({
  declarations: [ NzAvatarComponent ],
  exports     : [ NzAvatarComponent ],
  imports     : [ CommonModule, NzIconModule ]
})
export class NzAvatarModule {
}
