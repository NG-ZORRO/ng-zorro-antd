import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-cron-expression-size',
  template: `
    <div class="example-cron-expression">
      <nz-cron-expression nzSize="small"></nz-cron-expression>
      <nz-cron-expression nzSize="default"></nz-cron-expression>
      <nz-cron-expression nzSize="large"></nz-cron-expression>
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
export class NzDemoCronExpressionSizeComponent {}
