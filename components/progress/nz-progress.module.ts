import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzProgressComponent } from './nz-progress.component';

@NgModule({
  exports     : [NzProgressComponent],
  declarations: [NzProgressComponent],
  imports     : [CommonModule]
})
export class NzProgressModule {
}
