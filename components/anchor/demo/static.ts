import { Component, ViewEncapsulation } from '@angular/core';

import { NzAnchorModule } from 'ng-zorro-antd/anchor';

@Component({
  selector: 'nz-demo-anchor-static',
  imports: [NzAnchorModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-anchor [nzAffix]="false">
      <nz-link nzHref="#components-anchor-demo-basic" nzTitle="Basic demo"></nz-link>
      <nz-link nzHref="#components-anchor-demo-static" nzTitle="Static demo"></nz-link>
      <nz-link nzHref="#api" nzTitle="API">
        <nz-link nzHref="#nz-anchor" nzTitle="nz-anchor"></nz-link>
        <nz-link nzHref="#nz-link" nzTitle="nz-link"></nz-link>
      </nz-link>
    </nz-anchor>
  `
})
export class NzDemoAnchorStaticComponent {}
