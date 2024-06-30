import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-anchor-on-change',
  template: `
    <nz-anchor (nzChange)="handleChange($event)">
      <nz-link nzHref="#components-anchor-demo-basic" nzTitle="Basic demo"></nz-link>
      <nz-link nzHref="#components-anchor-demo-static" nzTitle="Static demo"></nz-link>
      <nz-link nzHref="#api" nzTitle="API">
        <nz-link nzHref="#nz-anchor" nzTitle="nz-anchor"></nz-link>
        <nz-link nzHref="#nz-link" nzTitle="nz-link"></nz-link>
      </nz-link>
    </nz-anchor>
  `
})
export class NzDemoAnchorOnChangeComponent {
  handleChange(link: string): void {
    console.log('Anchor:OnChange', link);
  }
}
