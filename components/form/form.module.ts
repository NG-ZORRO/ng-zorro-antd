/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzFormControlComponent } from './form-control.component';
import { NzFormItemComponent } from './form-item.component';
import { NzFormLabelComponent } from './form-label.component';
import { NzFormSplitComponent } from './form-split.component';
import { NzFormTextComponent } from './form-text.component';
import { NzFormDirective } from './form.directive';

@NgModule({
  imports: [
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzFormTextComponent,
    NzFormSplitComponent
  ],
  exports: [
    NzGridModule,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzFormTextComponent,
    NzFormSplitComponent
  ]
})
export class NzFormModule {}
