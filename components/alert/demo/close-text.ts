import { Component } from '@angular/core';

import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'nz-demo-alert-close-text',
  imports: [NzAlertModule],
  template: `<nz-alert nzType="info" nzMessage="Info Text" nzCloseText="Close Now"></nz-alert>`
})
export class NzDemoAlertCloseTextComponent {}
