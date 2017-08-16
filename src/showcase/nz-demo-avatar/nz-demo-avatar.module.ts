import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoAvatarBasicComponent } from './nz-demo-avatar-basic.component';
import { NzDemoAvatarTypeComponent } from './nz-demo-avatar-type.component';
import { NzDemoAvatarAutoSizeComponent } from './nz-demo-avatar-autosize.component';
import { NzDemoAvatarBadgeComponent } from './nz-demo-avatar-badge.component';
import { NzDemoAvatarComponent } from './nz-demo-avatar.component';

import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoAvatarRoutingModule } from './nz-demo-avatar.routing.module';

@NgModule({
  declarations: [ NzDemoAvatarComponent, NzDemoAvatarBasicComponent, NzDemoAvatarTypeComponent, NzDemoAvatarAutoSizeComponent, NzDemoAvatarBadgeComponent ],
  imports     : [ NzDemoAvatarRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ]
})
export class NzDemoAvatarModule {
}
