import { Component } from '@angular/core';

import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

@Component({
  selector: 'nz-demo-cron-expression-status',
  imports: [NzCronExpressionModule],
  template: `
    <div class="example-cron-expression">
      <nz-cron-expression nzStatus="error" />
      <nz-cron-expression nzStatus="warning" />
    </div>
  `,
  styles: `
    .example-cron-expression nz-cron-expression {
      display: block;
      margin-bottom: 8px;
    }
  `
})
export class NzDemoCronExpressionStatusComponent {}
