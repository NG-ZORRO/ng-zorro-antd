import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoCarouselComponent } from './nz-demo-carousel.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoCarouselComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoCarouselRoutingModule {
}
