import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-alert-basic',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <nz-alert nzType="success" nzMessage="Success Text"></nz-alert>
  `,
  styles       : [
      `
      .ant-alert {
        margin-bottom: 16px;
      }
    `
  ]
})
export class NzDemoAlertBasicComponent {
}
