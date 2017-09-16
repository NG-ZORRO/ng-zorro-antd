import { Component, HostBinding, ViewEncapsulation, Input } from '@angular/core';

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

  @HostBinding('class.ant-layout-is-fullscreen')
  @Input()
  isFullscreen = false;

  @HostBinding('class.ant-layout-has-sider') hasSider = false;

  @HostBinding('class.ant-layout') _nzLayout = true;
}
