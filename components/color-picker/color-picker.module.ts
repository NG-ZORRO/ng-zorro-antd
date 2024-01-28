/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzColorBlockComponent } from './color-block.component';
import { NzColorFormatComponent } from './color-format.component';
import { NzColorPickerComponent } from './color-picker.component';

@NgModule({
  imports: [NzColorPickerComponent, NzColorBlockComponent, NzColorFormatComponent],
  exports: [NzColorPickerComponent, NzColorBlockComponent]
})
export class NzColorPickerModule {}
