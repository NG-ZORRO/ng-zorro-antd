/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormPatchModule } from 'ng-zorro-antd/core/form';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTimePickerPanelComponent } from './time-picker-panel.component';
import { NzTimePickerComponent } from './time-picker.component';

@NgModule({
  declarations: [NzTimePickerComponent, NzTimePickerPanelComponent],
  exports: [NzTimePickerPanelComponent, NzTimePickerComponent],
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    NzI18nModule,
    OverlayModule,
    NzIconModule,
    NzOverlayModule,
    NzOutletModule,
    NzButtonModule,
    NzFormPatchModule
  ]
})
export class NzTimePickerModule {}
