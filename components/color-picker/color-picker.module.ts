/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgAntdColorPickerModule } from 'ng-antd-color-picker';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzColorBlockComponent } from './color-block.component';
import { NzColorFormatComponent } from './color-format.component';
import { NzColorPickerComponent } from './color-picker.component';

@NgModule({
  declarations: [NzColorPickerComponent, NzColorBlockComponent, NzColorFormatComponent],
  imports: [
    CommonModule,
    NgAntdColorPickerModule,
    NzPopoverModule,
    NzSelectModule,
    FormsModule,
    NzInputNumberModule,
    NzInputModule,
    ReactiveFormsModule
  ],
  exports: [NzColorPickerComponent, NzColorBlockComponent]
})
export class NzColorPickerModule {}
