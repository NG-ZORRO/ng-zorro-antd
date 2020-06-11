/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzAlertComponent } from './alert.component';

@NgModule({
  declarations: [NzAlertComponent],
  exports: [NzAlertComponent],
  imports: [CommonModule, NzIconModule, NzOutletModule]
})
export class NzAlertModule {}
