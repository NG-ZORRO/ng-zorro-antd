/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzTourComponent } from 'ng-zorro-antd/tour/tour';
import { NzTourStepComponent } from 'ng-zorro-antd/tour/tour-step';

@NgModule({
  imports: [NzTourComponent, NzTourStepComponent],
  exports: [NzTourComponent, NzTourStepComponent]
})
export class NzTourModule {}
