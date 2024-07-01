import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-custom-icon',
  template: `
    <nz-alert
      nzType="success"
      nzMessage="Success Tips"
      nzDescription="Detailed description and advices about successful copywriting."
      [nzIcon]="customIconTemplate"
      nzShowIcon
    ></nz-alert>

    <ng-template #customIconTemplate>
      <div> S </div>
    </ng-template>
  `,
  styles: [
    `
      nz-alert {
        margin-bottom: 16px;
      }
    `
  ]
})
export class NzDemoAlertCustomIconComponent {}
