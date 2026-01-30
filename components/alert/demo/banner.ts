import { Component } from '@angular/core';

import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'nz-demo-alert-banner',
  imports: [NzAlertModule],
  template: `
    <nz-alert nzBanner nzMessage="Warning text" />
    <nz-alert nzBanner nzMessage="Very long warning text warning text text text text text text text" nzCloseable />
    <nz-alert nzBanner nzMessage="Warning text without icon" [nzShowIcon]="false" />
    <nz-alert nzBanner nzType="error" nzMessage="Error text" />
  `,
  styles: `
    nz-alert {
      margin-bottom: 12px;
    }
  `
})
export class NzDemoAlertBannerComponent {}
