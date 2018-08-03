import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzDrawerComponent } from './nz-drawer.component';

@NgModule({
  declarations: [ NzDrawerComponent ],
  exports     : [ NzDrawerComponent ],
  imports     : [ CommonModule, OverlayModule ]
})
export class NzDrawerModule {
}
