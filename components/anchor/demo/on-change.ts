import { Component } from '@angular/core';

import { NzAnchorModule } from 'ng-zorro-antd/anchor';

@Component({
  selector: 'nz-demo-anchor-on-change',
  imports: [NzAnchorModule],
  template: `
    <nz-anchor (nzChange)="handleChange($event)">
      <nz-link nzHref="#components-anchor-demo-basic" nzTitle="Basic demo" />
      <nz-link nzHref="#components-anchor-demo-static" nzTitle="Static demo" />
      <nz-link nzHref="#api" nzTitle="API">
        <nz-link nzHref="#nz-anchor" nzTitle="nz-anchor" />
        <nz-link nzHref="#nz-link" nzTitle="nz-link" />
      </nz-link>
    </nz-anchor>
  `
})
export class NzDemoAnchorOnChangeComponent {
  handleChange(link: string): void {
    console.log('Anchor:OnChange', link);
  }
}
