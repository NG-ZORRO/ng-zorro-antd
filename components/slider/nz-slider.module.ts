import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzToolTipModule } from '../tooltip/nz-tooltip.module';

import { NzSliderHandleComponent } from './nz-slider-handle.component';
import { NzSliderMarksComponent } from './nz-slider-marks.component';
import { NzSliderStepComponent } from './nz-slider-step.component';
import { NzSliderTrackComponent } from './nz-slider-track.component';
import { NzSliderComponent } from './nz-slider.component';
import { NzSliderService } from './nz-slider.service';

@NgModule({
  exports: [ NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent ],
  declarations: [ NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent ],
  imports: [ CommonModule, NzToolTipModule ],
  providers: [ NzSliderService ]
})
export class NzSliderModule { }
