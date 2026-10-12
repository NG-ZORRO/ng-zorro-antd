import { Component } from '@angular/core';

import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'nz-demo-menu-submenu-theme',
  imports: [NzMenuModule],
  template: `
    <ul nz-menu nzMode="horizontal">
      <li nz-menu-item>Navigation One</li>
      <li nz-submenu nzOpen nzTheme="dark" nzTitle="Navigation Two">
        <ul>
          <li nz-menu-item>Option 1</li>
          <li nz-menu-item>Option 2</li>
          <li nz-menu-item>Option 3</li>
        </ul>
      </li>
      <li nz-menu-item>Navigation Three</li>
    </ul>
  `
})
export class NzDemoMenuSubmenuThemeComponent {}
