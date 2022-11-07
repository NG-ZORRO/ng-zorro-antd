/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzCronExpressionInputComponent } from './cron-expression-input.component';
import { NzCronExpressionLabelComponent } from './cron-expression-label.component';
import { NzCronExpressionComponent } from './cron-expression.component';

@NgModule({
  declarations: [NzCronExpressionComponent, NzCronExpressionLabelComponent, NzCronExpressionInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzToolTipModule,
    NzCollapseModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    ScrollingModule
  ],
  exports: [NzCronExpressionComponent]
})
export class NzCronExpressionModule {}
