import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SCROLL_SERVICE_PROVIDER } from '../core/scroll/nz-scroll.service';
import { NzAffixComponent } from './nz-affix.component';

@NgModule({
  declarations: [ NzAffixComponent ],
  exports     : [ NzAffixComponent ],
  imports     : [ CommonModule ],
  providers   : [ SCROLL_SERVICE_PROVIDER ]
})
export class NzAffixModule {
}
