import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoAffixBasicComponent } from './nz-demo-affix-basic.component';
import { NzDemoAffixFixedComponent } from './nz-demo-affix-fixed.component';
import { NzDemoAffixContainerComponent } from './nz-demo-affix-container.component';
import { NzDemoAffixComponent } from './nz-demo-affix.component';

import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoAffixRoutingModule } from './nz-demo-affix.routing.module';

@NgModule({
  declarations: [ NzDemoAffixComponent, NzDemoAffixBasicComponent, NzDemoAffixFixedComponent, NzDemoAffixContainerComponent ],
  imports     : [ NzDemoAffixRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ]
})

export class NzDemoAffixModule {

}
