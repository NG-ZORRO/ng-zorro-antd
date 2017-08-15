import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-layout',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})

export class NzLayoutComponent {
  @HostBinding('class.ant-layout-has-sider') hasSider = false;

  @HostBinding('class.ant-layout') true;
}
