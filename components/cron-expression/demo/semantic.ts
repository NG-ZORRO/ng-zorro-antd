import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CronExpressionParser } from 'cron-parser';

import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

@Component({
  selector: 'nz-demo-cron-expression-semantic',
  imports: [FormsModule, NzCronExpressionModule, DatePipe],
  template: `
    <nz-cron-expression [nzSemantic]="semanticTemplate" [ngModel]="value()" (ngModelChange)="getValue($event)" />
    <ng-template #semanticTemplate>Next Time: {{ semantic() | date: 'yyyy-MM-dd HH:mm:ss' }}</ng-template>
  `
})
export class NzDemoCronExpressionSemanticComponent {
  readonly value = signal('10 * * * *');
  readonly semantic = signal<Date | undefined>(undefined);

  getValue(value: string): void {
    this.value.set(value);
    try {
      const interval = CronExpressionParser.parse(value);
      this.semantic.set(interval.next().toDate());
    } catch {
      return;
    }
  }
}
