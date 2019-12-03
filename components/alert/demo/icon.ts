import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-icon',
  template: `
    <nz-alert nzType="success" nzMessage="Success Tips" nzShowIcon></nz-alert>
    <nz-alert nzType="info" nzMessage="Informational Notes" nzShowIcon></nz-alert>
    <nz-alert nzType="warning" nzMessage="Warning" nzShowIcon></nz-alert>
    <nz-alert nzType="error" nzMessage="Error" nzShowIcon></nz-alert>
    <nz-alert
      nzType="success"
      nzMessage="Success Tips"
      nzDescription="Detailed description and advices about successful copywriting."
      nzShowIcon
    >
    </nz-alert>
    <nz-alert
      nzType="info"
      nzMessage="Informational Notes"
      nzDescription="Additional description and informations about copywriting."
      nzShowIcon
    >
    </nz-alert>
    <nz-alert nzType="warning" nzMessage="Warning" nzDescription="This is a warning notice about copywriting." nzShowIcon> </nz-alert>
    <nz-alert nzType="error" nzMessage="Error" nzDescription="This is an error message about copywriting." nzShowIcon> </nz-alert>
  `,
  styles: [
    `
      nz-alert {
        margin-bottom: 16px;
      }
    `
  ]
})
export class NzDemoAlertIconComponent {}
