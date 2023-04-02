/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzWaterMarkComponent } from './water-mark.component';

@NgModule({
  exports: [NzWaterMarkComponent],
  declarations: [NzWaterMarkComponent],
  imports: [CommonModule]
})
export class NzWaterMarkModule {}
