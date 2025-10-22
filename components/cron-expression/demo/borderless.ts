import { Component } from '@angular/core';

import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

@Component({
  selector: 'nz-demo-cron-expression-borderless',
  imports: [NzCronExpressionModule],
  template: `<nz-cron-expression nzBorderless></nz-cron-expression>`
})
export class NzDemoCronExpressionBorderlessComponent {}
