import { Component } from '@angular/core';

import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'nz-demo-badge-status',
  imports: [NzBadgeModule],
  template: `
    <nz-badge nzStatus="success" />
    <nz-badge nzStatus="error" />
    <nz-badge nzStatus="default" />
    <nz-badge nzStatus="processing" />
    <nz-badge nzStatus="warning" />
    <br />
    <nz-badge nzStatus="success" nzText="Success" />
    <br />
    <nz-badge nzStatus="error" nzText="Error" />
    <br />
    <nz-badge nzStatus="default" nzText="Default" />
    <br />
    <nz-badge nzStatus="processing" nzText="Processing" />
    <br />
    <nz-badge nzStatus="warning" nzText="Warning" />
    <br />
  `
})
export class NzDemoBadgeStatusComponent {}
