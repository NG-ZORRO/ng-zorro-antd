import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzAffixComponent } from './nz-affix.component';
import { SCROLL_SERVICE_PROVIDER } from "../core/scroll/nz-scroll.service";

@NgModule({
  declarations: [ NzAffixComponent ],
  exports     : [ NzAffixComponent ],
  imports     : [ CommonModule ],
  providers   : [ SCROLL_SERVICE_PROVIDER ]
})
export class NzAffixModule {
}

