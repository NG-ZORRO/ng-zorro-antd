import { Component } from '@angular/core';

import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'nz-demo-alert-closable',
  imports: [NzAlertModule],
  template: `
    <nz-alert
      nzType="warning"
      nzCloseable
      nzMessage="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
      (nzOnClose)="afterClose()"
    />
    <nz-alert
      nzType="error"
      nzCloseable
      nzMessage="Error Text"
      nzDescription="Error Description Error Description Error Description Error Description Error Description Error Description"
      (nzOnClose)="afterClose()"
    />
  `,
  styles: `
    nz-alert {
      margin-bottom: 16px;
    }
  `
})
export class NzDemoAlertClosableComponent {
  afterClose(): void {
    console.log('close');
  }
}
