import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoInputNumberBasicComponent } from './nz-demo-input-number-basic.component';
import { NzDemoInputNumberFormatterComponent } from './nz-demo-input-number-formatter.component';
import { NzDemoInputNumberSizeComponent } from './nz-demo-input-number-size.component';
import { NzDemoInputNumberDisabledComponent } from './nz-demo-input-number-disabled.component';
import { NzDemoInputNumberDigitComponent } from './nz-demo-input-number-digit.component';
import { NzDemoInputNumberComponent } from './nz-demo-input-number.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoInputNumberRoutingModule } from './nz-demo-input-number.routing.module';

@NgModule({
  imports     : [ NzDemoInputNumberRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoInputNumberFormatterComponent, NzDemoInputNumberBasicComponent, NzDemoInputNumberSizeComponent, NzDemoInputNumberDisabledComponent, NzDemoInputNumberDigitComponent, NzDemoInputNumberComponent ]
})
export class NzDemoInputNumberModule {

}
