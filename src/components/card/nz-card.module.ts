import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardComponent } from './nz-card.component';
import { NzCardGridDirective } from './nz-card-grid.directive';

@NgModule({
  imports     : [ CommonModule ],
  declarations: [ NzCardComponent, NzCardGridDirective ],
  exports     : [ NzCardComponent, NzCardGridDirective ]
})
export class NzCardModule {
}
