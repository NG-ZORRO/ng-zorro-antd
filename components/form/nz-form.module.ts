/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzFormControlComponent } from './nz-form-control.component';
import { NzFormExplainComponent } from './nz-form-explain.component';
import { NzFormExtraComponent } from './nz-form-extra.component';
import { NzFormItemComponent } from './nz-form-item.component';
import { NzFormLabelComponent } from './nz-form-label.component';
import { NzFormSplitComponent } from './nz-form-split.component';
import { NzFormTextComponent } from './nz-form-text.component';
import { NzFormDirective } from './nz-form.directive';

@NgModule({
  declarations: [
    NzFormExtraComponent,
    NzFormLabelComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzFormExplainComponent,
    NzFormTextComponent,
    NzFormSplitComponent
  ],
  exports: [
    NzFormExtraComponent,
    NzFormLabelComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzFormExplainComponent,
    NzFormTextComponent,
    NzFormSplitComponent
  ],
  imports: [CommonModule, NzGridModule, NzIconModule, LayoutModule, PlatformModule, NzAddOnModule]
})
export class NzFormModule {}
