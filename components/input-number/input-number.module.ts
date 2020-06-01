/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzInputNumberComponent } from './input-number.component';

@NgModule({
  imports: [CommonModule, FormsModule, NzIconModule],
  declarations: [NzInputNumberComponent],
  exports: [NzInputNumberComponent]
})
export class NzInputNumberModule {}
