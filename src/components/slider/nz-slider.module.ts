import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzToolTipModule } from '../tooltip/nz-tooltip.module';
import { NzSliderService } from './nz-slider.service';
import { NzSliderComponent } from './nz-slider.component';
import { NzSliderTrackComponent } from './nz-slider-track.component';
import { NzSliderHandleComponent } from './nz-slider-handle.component';
import { NzSliderStepComponent } from './nz-slider-step.component';
import { NzSliderMarksComponent } from './nz-slider-marks.component';

@NgModule({
  exports: [ NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent ],
  declarations: [ NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent ],
  imports: [ CommonModule, NzToolTipModule ],
  providers: [ NzSliderService ]
})
export class NzSliderModule { }
