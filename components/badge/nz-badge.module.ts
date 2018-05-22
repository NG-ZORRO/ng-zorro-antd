import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzBadgeComponent } from './nz-badge.component';

@NgModule({
  declarations: [ NzBadgeComponent ],
  exports     : [ NzBadgeComponent ],
  imports     : [ CommonModule, ObserversModule ]
})
export class NzBadgeModule {
}
