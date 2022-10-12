/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzCronExpressionSpecializedComponent } from './cron-expression-specialized.component';
import { NzCronExpressionComponent } from './cron-expression.component';

@NgModule({
  declarations: [NzCronExpressionComponent, NzCronExpressionSpecializedComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzToolTipModule,
    NzCollapseModule,
    NzButtonModule,
    NzDropDownModule,
    NzFormModule,
    NzInputModule,
    NzIconModule
  ],
  exports: [NzCronExpressionComponent]
})
export class NzCronExpressionModule {}
