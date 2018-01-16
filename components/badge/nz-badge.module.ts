import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzBadgeComponent } from './nz-badge.component';

@NgModule({
  declarations: [ NzBadgeComponent ],
  exports     : [ NzBadgeComponent ],
  imports     : [ CommonModule ]
})
export class NzBadgeModule {
}
