/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NgAntdColorBlockComponent } from './ng-antd-color-block.component';
import { NgAntdColorPickerComponent } from './ng-antd-color-picker.component';
import { NgAntdColorPresetComponent } from './ng-antd-color-preset.component';

@NgModule({
  imports: [NgAntdColorPickerComponent, NgAntdColorBlockComponent, NgAntdColorPresetComponent],
  exports: [NgAntdColorPickerComponent, NgAntdColorBlockComponent, NgAntdColorPresetComponent]
})
export class NgAntdColorPickerModule {}
