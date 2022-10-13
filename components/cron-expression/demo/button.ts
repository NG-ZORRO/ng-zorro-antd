import { Component } from '@angular/core';

import { CronSettings } from 'ng-zorro-antd/cron-expression';

@Component({
  selector: 'nz-demo-cron-expression-button',
  template: `
    <div class="example-cron-expression">
      <nz-cron-expression [nzMoreDisable]="true"></nz-cron-expression>
      <nz-cron-expression nzType="primary"></nz-cron-expression>
      <nz-cron-expression [nzDefaultConfigure]="defaultSetting"></nz-cron-expression>
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
export class NzDemoCronExpressionButtonComponent {
  defaultSetting: CronSettings = [
    {
      label: '每小时',
      value: '0 0-23/1 * * *'
    },
    {
      label: '每天八点',
      value: '0 8 * * *'
    },
    {
      label: '每周一',
      value: '0 0 * * 1'
    }
  ];
}
