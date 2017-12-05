import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoCarouselBasicComponent } from './nz-demo-carousel-basic.component';
import { NzDemoCarouselVerticalComponent } from './nz-demo-carousel-vertical.component';
import { NzDemoCarouselFadeComponent } from './nz-demo-carousel-fade.component';
import { NzDemoCarouselAutoComponent } from './nz-demo-carousel-auto.component';
import { NzDemoCarouselComponent } from './nz-demo-carousel.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoCarouselRoutingModule } from './nz-demo-carousel.routing.module';

@NgModule({
  imports     : [
    NgZorroAntdModule,
    NzDemoCarouselRoutingModule,
    CommonModule,
    FormsModule,
    NzCodeBoxModule
  ],
  declarations: [
    NzDemoCarouselComponent,
    NzDemoCarouselBasicComponent,
    NzDemoCarouselVerticalComponent,
    NzDemoCarouselFadeComponent,
    NzDemoCarouselAutoComponent
  ]
})
export class NzDemoCarouselModule {

}
