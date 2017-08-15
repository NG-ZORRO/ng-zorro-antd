import { NgModule } from '@angular/core';
import { NzBadgeComponent } from './nz-badge.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ NzBadgeComponent ],
  exports     : [ NzBadgeComponent ],
  imports     : [ CommonModule ]
})
export class NzBadgeModule {
}

