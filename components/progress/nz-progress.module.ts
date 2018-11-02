import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzProgressComponent } from './nz-progress.component';

@NgModule({
  exports     : [ NzProgressComponent ],
  declarations: [ NzProgressComponent ],
  imports     : [ CommonModule, NzIconModule ]
})
export class NzProgressModule {
}
