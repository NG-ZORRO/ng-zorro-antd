import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-cron-expression-basic',
  template: `
    <nz-cron-expression></nz-cron-expression>
    <br />
    <br />
    <nz-cron-expression nzDisabled></nz-cron-expression>
  `
})
export class NzDemoCronExpressionBasicComponent {}
