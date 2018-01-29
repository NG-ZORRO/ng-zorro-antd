import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { GoodSelectDemoBasicComponent } from './good-select-demo-basic.component';

import { GoodSelectDemoRoutingModule } from './good-select-demo.routing.module';
import { NzCodeBoxModule } from '../../share/nz-codebox/nz-codebox.module';
import { YztCustomModule } from '../../../custom-components/yzt-custom.module';
import { GoodSelectDemoComponent } from './good-select-demo.component';

@NgModule({
  imports     : [ GoodSelectDemoRoutingModule, CommonModule, NzCodeBoxModule, YztCustomModule, FormsModule, JsonpModule ],
  declarations: [ GoodSelectDemoBasicComponent, GoodSelectDemoComponent ]
})
export class GoodSelectDemoModule {

}
