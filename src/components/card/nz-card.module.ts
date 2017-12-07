import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzCardGridDirective } from './nz-card-grid.directive';
import { NzCardComponent } from './nz-card.component';

@NgModule({
  imports     : [ CommonModule ],
  declarations: [ NzCardComponent, NzCardGridDirective ],
  exports     : [ NzCardComponent, NzCardGridDirective ]
})
export class NzCardModule {
}
