import { Component } from '@angular/core';

import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'nz-demo-alert-description',
  imports: [NzAlertModule],
  template: `
    <nz-alert
      nzType="success"
      nzMessage="Success Text"
      nzDescription="Success Description Success Description Success Description"
    />
    <nz-alert
      nzType="info"
      nzMessage="Info Text"
      nzDescription="Info Description Info Description Info Description Info Description"
    />
    <nz-alert
      nzType="warning"
      nzMessage="Warning Text"
      nzDescription="Warning Description Warning Description Warning Description Warning Description"
    />
    <nz-alert
      nzType="error"
      nzMessage="Error Text"
      nzDescription="Error Description Error Description Error Description Error Description"
    />
  `,
  styles: `
    nz-alert {
      margin-bottom: 16px;
    }
  `
})
export class NzDemoAlertDescriptionComponent {}
