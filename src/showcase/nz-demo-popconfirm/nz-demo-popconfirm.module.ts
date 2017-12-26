import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoPopconfirmBasicComponent } from './nz-demo-popconfirm-basic.component';
import { NzDemoPopconfirmLocalComponent } from './nz-demo-popconfirm-locale.component';
import { NzDemoPopconfirmLocationComponent } from './nz-demo-popconfirm-location.component';
import { NzDemoPopconfirmKickComponent } from './nz-demo-popconfirm-kick.component';
import { NzDemoPopconfirmComponent } from './nz-demo-popconfirm.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoPopconfirmRoutingModule } from './nz-demo-popconfirm.routing.module';

@NgModule({
  imports     : [ NzDemoPopconfirmRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoPopconfirmBasicComponent, NzDemoPopconfirmLocalComponent, NzDemoPopconfirmLocationComponent, NzDemoPopconfirmKickComponent, NzDemoPopconfirmComponent ]
})
export class NzDemoPopconfirmModule {

}
