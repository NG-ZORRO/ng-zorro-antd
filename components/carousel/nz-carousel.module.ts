import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzCarouselContentDirective } from './nz-carousel-content.directive';
import { NzCarouselComponent } from './nz-carousel.component';

@NgModule({
  declarations: [ NzCarouselComponent, NzCarouselContentDirective ],
  exports     : [ NzCarouselComponent, NzCarouselContentDirective ],
  imports     : [ CommonModule ]
})
export class NzCarouselModule {
}
