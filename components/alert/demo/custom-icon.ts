import { Component } from '@angular/core';

import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  standalone: true,
  selector: 'nz-demo-alert-custom-icon',
  imports: [NzAlertModule],
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
  `
})
export class NzDemoAlertCustomIconComponent {}
