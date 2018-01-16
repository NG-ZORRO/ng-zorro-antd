import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzCardGridDirective } from './nz-card-grid.directive';
import { NzCardMetaComponent } from './nz-card-meta.component';
import { NzCardComponent } from './nz-card.component';

@NgModule({
  imports     : [ CommonModule ],
  declarations: [ NzCardComponent, NzCardGridDirective, NzCardMetaComponent ],
  exports     : [ NzCardComponent, NzCardGridDirective, NzCardMetaComponent ]
})
export class NzCardModule {
}
