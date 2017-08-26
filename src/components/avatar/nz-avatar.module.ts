import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarComponent } from './nz-avatar.component';

@NgModule({
  declarations: [ NzAvatarComponent ],
  exports     : [ NzAvatarComponent ],
  imports     : [ CommonModule ]
})

export class NzAvatarModule {
}
