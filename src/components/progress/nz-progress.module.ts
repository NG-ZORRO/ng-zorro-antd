import {NgModule} from '@angular/core';
import {NzProgressComponent} from './nz-progress.component';
import {CommonModule} from '@angular/common';

@NgModule({
  exports     : [NzProgressComponent],
  declarations: [NzProgressComponent],
  imports     : [CommonModule]
})
export class NzProgressModule {
}
