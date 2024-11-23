import { Component } from '@angular/core';

import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  standalone: true,
  selector: 'nz-demo-alert-style',
  imports: [NzAlertModule],
  template: `
    <nz-alert nzType="success" nzMessage="Success Text"></nz-alert>
    <nz-alert nzType="info" nzMessage="Info Text"></nz-alert>
    <nz-alert nzType="warning" nzMessage="Warning Text"></nz-alert>
    <nz-alert nzType="error" nzMessage="Error Text"></nz-alert>
  `,
  styles: [
    `
      nz-alert {
        margin-bottom: 16px;
      }
    `
  ]
})
export class NzDemoAlertStyleComponent {}
