import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzDrawerComponent } from './nz-drawer.component';
import { NzDrawerService } from './nz-drawer.service';

@NgModule({
  imports        : [ CommonModule, OverlayModule, PortalModule ],
  exports        : [ NzDrawerComponent ],
  declarations   : [ NzDrawerComponent ],
  entryComponents: [ NzDrawerComponent ],
  providers      : [ NzDrawerService ]
})
export class NzDrawerModule {
}
