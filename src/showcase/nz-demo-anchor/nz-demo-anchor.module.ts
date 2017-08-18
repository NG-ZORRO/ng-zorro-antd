import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoAnchorFixedComponent } from './nz-demo-anchor-fixed.component';
import { NzDemoAnchorBasicComponent } from './nz-demo-anchor-basic.component';
import { NzDemoAnchorComponent } from './nz-demo-anchor.component';


import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoAnchorRoutingModule } from './nz-demo-anchor.routing.module';

@NgModule({
  declarations: [ NzDemoAnchorComponent, NzDemoAnchorBasicComponent, NzDemoAnchorFixedComponent ],
  imports     : [ NzDemoAnchorRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ]
})

export class NzDemoAnchorModule {

}
