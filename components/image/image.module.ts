/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzImageComponent, NzImageImgItemDirective } from './image.component';

@NgModule({
  declarations: [NzImageComponent, NzImageImgItemDirective],
  exports: [NzImageComponent, NzImageImgItemDirective],
  imports: [CommonModule, NzIconModule]
})
export class NzImageModule {}
