import { Component } from '@angular/core';

import { parseExpression } from 'cron-parser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-demo-cron-expression-semantic',
  template: ` <nz-cron-expression
      [nzSemantic]="semanticTemplate"
      [(ngModel)]="value"
      (ngModelChange)="getValue($event)"
    ></nz-cron-expression>
    <ng-template #semanticTemplate>Next Time: {{ semantic | date: 'YYYY-MM-dd HH:mm:ss' }}</ng-template>`
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
