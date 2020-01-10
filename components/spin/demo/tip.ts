import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-tip',
  template: `
    <nz-spin nzTip="Loading...">
      <nz-alert nzType="info" nzMessage="Alert message title" nzDescription="Further details about the context of this alert."> </nz-alert>
    </nz-spin>
  `
})
export class NzDemoSpinTipComponent {}
