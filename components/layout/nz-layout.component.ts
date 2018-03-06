import { Component } from '@angular/core';

@Component({
  selector           : 'nz-layout',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>
  `,
  host               : {
    '[class.ant-layout]'                : 'true',
    '[class.ant-layout-has-sider]': 'hasSider'
  }
})
export class NzLayoutComponent {
  hasSider = false;
}
