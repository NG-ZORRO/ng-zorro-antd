/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzCronExpressionInputComponent } from './cron-expression-input.component';
import { NzCronExpressionLabelComponent } from './cron-expression-label.component';
import { NzCronExpressionPreviewComponent } from './cron-expression-preview.component';
import { NzCronExpressionComponent } from './cron-expression.component';

@NgModule({
  imports: [
    NzCronExpressionComponent,
    NzCronExpressionLabelComponent,
    NzCronExpressionInputComponent,
    NzCronExpressionPreviewComponent
  ],
  exports: [NzCronExpressionComponent]
})
export class NzCronExpressionModule {}
