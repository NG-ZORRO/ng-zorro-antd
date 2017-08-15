import { NgModule } from '@angular/core';
import { NzCarouselComponent } from './nz-carousel.component';
import { NzCarouselContentDirective } from './nz-carousel-content.directive';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [ NzCarouselComponent, NzCarouselContentDirective ],
  exports     : [ NzCarouselComponent, NzCarouselContentDirective ],
  imports     : [ CommonModule ]
})

export class NzCarouselModule {
}
