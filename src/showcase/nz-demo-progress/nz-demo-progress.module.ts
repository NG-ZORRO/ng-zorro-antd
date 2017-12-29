import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoProgressBasicComponent } from './nz-demo-progress-basic.component';
import { NzDemoProgressCircleComponent } from './nz-demo-progress-circle.component';
import { NzDemoProgressLineMiniComponent } from './nz-demo-progress-line-mini.component';
import { NzDemoProgressCircleMiniComponent } from './nz-demo-progress-circle-mini.component';
import { NzDemoProgressCircleDynamicComponent } from './nz-demo-progress-circle-dynamic.component';
import { NzDemoProgressLineDynamicComponent } from './nz-demo-progress-line-dynamic.component';
import { NzDemoProgressFormatComponent } from './nz-demo-progress-format.component';
import { NzDemoProgressComponent } from './nz-demo-progress.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoProgressRoutingModule } from './nz-demo-progress.routing.module';

@NgModule({
  imports     : [ FormsModule, NzDemoProgressRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoProgressBasicComponent, NzDemoProgressCircleComponent, NzDemoProgressLineMiniComponent, NzDemoProgressCircleMiniComponent, NzDemoProgressCircleDynamicComponent, NzDemoProgressLineDynamicComponent, NzDemoProgressFormatComponent, NzDemoProgressComponent ]
})
export class NzDemoProgressModule {

}
