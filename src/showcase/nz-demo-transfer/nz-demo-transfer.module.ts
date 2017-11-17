import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NzDemoTransferComponent } from './nz-demo-transfer.component';
import { NzDemoTransferRoutingModule } from './nz-demo-transfer.routing.module';
import { NzDemoTransferBasicComponent } from './nz-demo-transfer-basic.component';
import { NzDemoTransferSearchComponent } from './nz-demo-transfer-search.component';
import { NzDemoTransferAdvancedComponent } from './nz-demo-transfer-advanced.component';
import { NzDemoTransferCustomItemComponent } from './nz-demo-transfer-custom-item.component';

@NgModule({
  imports     : [ NzDemoTransferRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoTransferComponent, NzDemoTransferBasicComponent, NzDemoTransferSearchComponent, NzDemoTransferAdvancedComponent, NzDemoTransferCustomItemComponent ]
})

export class NzDemoTransferModule {

}
