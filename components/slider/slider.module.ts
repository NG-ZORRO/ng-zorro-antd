/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzSliderHandleComponent } from './handle.component';
import { NzSliderMarksComponent } from './marks.component';
import { NzSliderComponent } from './slider.component';
import { NzSliderStepComponent } from './step.component';
import { NzSliderTrackComponent } from './track.component';

@NgModule({
  exports: [NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent],
  declarations: [NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent],
  imports: [CommonModule, PlatformModule, NzToolTipModule]
})
export class NzSliderModule {}
