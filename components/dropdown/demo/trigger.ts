import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-trigger',
  template: `
    <nz-dropdown [nzTrigger]="'click'">
      <a nz-dropdown>
        Click me <i nz-icon type="down"></i>
      </a>
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-menu-divider></li>
        <li nz-menu-item nzDisabled>disabled menu item</li>
        <li nz-submenu>
          <span title>sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
        <li nz-submenu nzDisabled>
          <span title>disabled sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </nz-dropdown>`,
  styles  : []
})
export class NzDemoDropdownTriggerComponent {
}
