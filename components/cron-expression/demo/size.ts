import { Component } from '@angular/core';

import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

@Component({
  selector: 'nz-demo-cron-expression-size',
  imports: [NzCronExpressionModule],
  template: `
    <div class="example-cron-expression">
      <nz-cron-expression nzSize="small" />
      <nz-cron-expression nzSize="default" />
      <nz-cron-expression nzSize="large" />
    </div>
  `,
  styles: `
    .example-cron-expression nz-cron-expression {
      margin: 0 8px 8px 0;
    }
  `
})
export class NzDemoCronExpressionSizeComponent {}
