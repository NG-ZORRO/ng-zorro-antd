/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDividerComponent } from './divider.component';

@NgModule({
  imports: [CommonModule, NzOutletModule],
  declarations: [NzDividerComponent],
  exports: [NzDividerComponent]
})
export class NzDividerModule {}
