import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzBackTopComponent } from './nz-back-top.component';
import { SCROLL_SERVICE_PROVIDER } from "../core/scroll/nz-scroll.service";

@NgModule({
  declarations: [ NzBackTopComponent ],
  exports     : [ NzBackTopComponent ],
  imports     : [ CommonModule ],
  providers   : [ SCROLL_SERVICE_PROVIDER ]
})
export class NzBackTopModule {
}

