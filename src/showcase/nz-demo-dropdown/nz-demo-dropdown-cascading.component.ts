import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-dropdown-cascading',
  template: `
    <nz-dropdown>
      <a class="ant-dropdown-link" nz-dropdown>
        Cascading menu <i class="anticon anticon-down"></i>
      </a>
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-submenu>
          <span title>sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </nz-dropdown>`,
  styles  : []
})
export class NzDemoDropDownCascadingComponent { }
