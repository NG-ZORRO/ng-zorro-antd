import { Component } from '@angular/core';

import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

@Component({
  selector: 'nz-demo-cron-expression-basic',
  imports: [NzCronExpressionModule],
  template: `
    <nz-cron-expression></nz-cron-expression>
    <br />
    <br />
    <nz-cron-expression nzDisabled></nz-cron-expression>
  `
})
export class NzDemoCronExpressionBasicComponent {}
