import { Component } from '@angular/core';

import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

@Component({
  selector: 'nz-demo-cron-expression-collapse',
  imports: [NzCronExpressionModule],
  template: `<nz-cron-expression [nzCollapseDisable]="true" />`
})
export class NzDemoCronExpressionCollapseComponent {}
