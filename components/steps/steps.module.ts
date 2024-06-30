/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzStepComponent } from './step.component';
import { NzStepsComponent } from './steps.component';

@NgModule({
  imports: [NzStepsComponent, NzStepComponent],
  exports: [NzStepsComponent, NzStepComponent]
})
export class NzStepsModule {}
