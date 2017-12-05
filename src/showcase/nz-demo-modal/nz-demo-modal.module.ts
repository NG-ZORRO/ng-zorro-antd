import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoModalBasicComponent } from './nz-demo-modal-basic.component';
import { NzDemoModalCustomizeComponent } from './nz-demo-modal-customize.component';
import { NzDemoModalAsyncComponent } from './nz-demo-modal-async.component';
import { NzDemoConfirmBasicComponent } from './nz-demo-confirm-basic.component';
import { NzDemoConfirmAsyncComponent } from './nz-demo-confirm-async.component';
import { NzDemoConfirmInfoComponent } from './nz-demo-confirm-info.component';
import { NzDemoModalLocaleComponent } from './nz-demo-modal-locale.component';
import { NzDemoModalStyleComponent } from './nz-demo-modal-style.component';
import { NzDemoConfirmDestroyComponent } from './nz-demo-confirm-destroy.component';
import { NzDemoModalServiceComponent } from './nz-demo-modal-service.component';
import { NzDemoModalComponent } from './nz-demo-modal.component'
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzModalCustomizeComponent } from './nz-modal-customize.component';

import { NzDemoModalRoutingModule } from './nz-demo-modal.routing.module';

@NgModule({
  imports        : [ NzDemoModalRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations   : [ NzDemoModalComponent, NzDemoModalBasicComponent, NzDemoModalCustomizeComponent, NzDemoModalAsyncComponent, NzDemoConfirmBasicComponent, NzDemoConfirmAsyncComponent, NzDemoConfirmInfoComponent, NzDemoModalLocaleComponent, NzDemoModalStyleComponent, NzDemoConfirmDestroyComponent, NzDemoModalServiceComponent, NzModalCustomizeComponent ],
  entryComponents: [ NzModalCustomizeComponent ]
})
export class NzDemoModalModule {

}
