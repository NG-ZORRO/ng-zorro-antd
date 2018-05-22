import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-anchor-static',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <nz-anchor [nzAffix]="false">
      <nz-link nzHref="#components-anchor-demo-basic" nzTitle="Basic demo"></nz-link>
      <nz-link nzHref="#components-anchor-demo-static" nzTitle="Static demo"></nz-link>
      <nz-link nzHref="#API" nzTitle="API">
        <nz-link nzHref="#anchor-props" nzTitle="nz-anchor"></nz-link>
        <nz-link nzHref="#link-props" nzTitle="nz-link"></nz-link>
      </nz-link>
    </nz-anchor>
  `
})
export class NzDemoAnchorStaticComponent {
}
