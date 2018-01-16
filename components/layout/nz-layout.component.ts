import { Component, HostBinding } from '@angular/core';

@Component({
  selector           : 'nz-layout',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>
  `,
  host               : {
    '[class.ant-layout]': 'true'
  }
})
export class NzLayoutComponent {
  @HostBinding('class.ant-layout-has-sider') hasSider = false;
}
