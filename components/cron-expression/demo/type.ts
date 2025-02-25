import { Component } from '@angular/core';

import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

@Component({
  selector: 'nz-demo-cron-expression-type',
  imports: [NzCronExpressionModule],
  template: `
    <div class="example-cron-expression">
      <nz-cron-expression nzType="linux"></nz-cron-expression>
      <nz-cron-expression nzType="spring"></nz-cron-expression>
    </div>
  `,
  styles: [
    `
      .example-cron-expression nz-cron-expression {
        margin: 0 8px 8px 0;
      }
    `
  ]
})
export class NzDemoCronExpressionTypeComponent {}
