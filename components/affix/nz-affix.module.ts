import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAffixComponent } from './nz-affix.component';

@NgModule({
  declarations: [ NzAffixComponent ],
  exports     : [ NzAffixComponent ],
  imports     : [ CommonModule ]
})
export class NzAffixModule {
}
