import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-anchor-basic',
  template: `
  <nz-anchor>
    <nz-link nzHref="#何时使用" nzTitle="何时使用"></nz-link>
    <nz-link nzHref="#components-anchor-demo-basic" nzTitle="Basic demo"></nz-link>
    <nz-link nzHref="#API" nzTitle="API">
      <nz-link nzHref="#API-Anchor" nzTitle="nz-anchor"></nz-link>
      <nz-link nzHref="#API-AnchorLink" nzTitle="nz-link"></nz-link>
    </nz-link>
  </nz-anchor>
  `
})

export class NzDemoAnchorBasicComponent { }
