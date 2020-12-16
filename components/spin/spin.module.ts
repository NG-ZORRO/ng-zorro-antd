/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzSpinComponent } from './spin.component';

@NgModule({
  exports: [NzSpinComponent],
  declarations: [NzSpinComponent],
  imports: [BidiModule, CommonModule, ObserversModule]
})
export class NzSpinModule {}
