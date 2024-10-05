import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { parseExpression } from 'cron-parser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

@Component({
  selector: 'nz-demo-cron-expression-semantic',
  standalone: true,
  imports: [FormsModule, NzCronExpressionModule, DatePipe],
  template: `
    <nz-cron-expression
      [nzSemantic]="semanticTemplate"
      [ngModel]="value"
      (ngModelChange)="getValue($event)"
    ></nz-cron-expression>
    <ng-template #semanticTemplate>Next Time: {{ semantic | date: 'YYYY-MM-dd HH:mm:ss' }}</ng-template>
  `
})
export class NzDemoCronExpressionSemanticComponent {
  value: string = '10 * * * *';
  semantic?: Date;

  getValue(value: string): void {
    try {
      const interval = parseExpression(value);
      this.semantic = interval.next().toDate();
    } catch (err: NzSafeAny) {
      return;
    }
  }
}
