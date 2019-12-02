import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-description',
  template: `
    <nz-alert nzType="success" nzMessage="Success Text" nzDescription="Success Description Success Description Success Description">
    </nz-alert>
    <nz-alert nzType="info" nzMessage="Info Text" nzDescription="Info Description Info Description Info Description Info Description">
    </nz-alert>
    <nz-alert
      nzType="warning"
      nzMessage="Warning Text"
      nzDescription="Warning Description Warning Description Warning Description Warning Description"
    >
    </nz-alert>
    <nz-alert nzType="error" nzMessage="Error Text" nzDescription="Error Description Error Description Error Description Error Description">
    </nz-alert>
  `,
  styles: [
    `
      nz-alert {
        margin-bottom: 16px;
      }
    `
  ]
})
export class NzDemoAlertDescriptionComponent {}
