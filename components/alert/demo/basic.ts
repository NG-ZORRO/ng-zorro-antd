import { Component } from '@angular/core';

import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'nz-demo-alert-basic',
  imports: [NzAlertModule],
  template: `<nz-alert nzType="success" nzMessage="Success Text" />`
})
export class NzDemoAlertBasicComponent {}
