import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoSliderComponent } from './nz-demo-slider.component';
import { NzDemoSliderBasicComponent } from './nz-demo-slider-basic.component';
import { NzDemoSliderInputNumberComponent } from './nz-demo-slider-input-number.component';
import { NzDemoSliderIconComponent } from './nz-demo-slider-icon.component';
import { NzDemoSliderEventComponent } from './nz-demo-slider-event.component';
import { NzDemoSliderTipFormatterComponent } from './nz-demo-slider-tip-formatter.component';
import { NzDemoSliderVerticalComponent } from './nz-demo-slider-vertical.component';
import { NzDemoSliderMarkComponent } from './nz-demo-slider-mark.component';

import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoSliderRoutingModule } from './nz-demo-slider.routing.module';

@NgModule({
  imports: [ CommonModule, FormsModule, NgZorroAntdModule, NzCodeBoxModule, NzDemoSliderRoutingModule ],
  declarations: [
    NzDemoSliderComponent,
    NzDemoSliderBasicComponent,
    NzDemoSliderInputNumberComponent,
    NzDemoSliderIconComponent,
    NzDemoSliderEventComponent,
    NzDemoSliderTipFormatterComponent,
    NzDemoSliderVerticalComponent,
    NzDemoSliderMarkComponent
  ]
})
export class NzDemoSliderModule { }
