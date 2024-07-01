/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzSliderHandleComponent } from './handle.component';
import { NzSliderMarksComponent } from './marks.component';
import { NzSliderComponent } from './slider.component';
import { NzSliderStepComponent } from './step.component';
import { NzSliderTrackComponent } from './track.component';

@NgModule({
  imports: [
    NzSliderComponent,
    NzSliderTrackComponent,
    NzSliderHandleComponent,
    NzSliderStepComponent,
    NzSliderMarksComponent
  ],
  exports: [
    NzSliderComponent,
    NzSliderTrackComponent,
    NzSliderHandleComponent,
    NzSliderStepComponent,
    NzSliderMarksComponent
  ]
})
export class NzSliderModule {}
