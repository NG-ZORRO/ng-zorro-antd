import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-item',
  template: `
    <a nz-dropdown [nzDropdownMenu]="menu">
      Hover me
      <i nz-icon nzType="down"></i>
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-menu-divider></li>
        <li nz-menu-item nzDisabled>3rd menu item（disabled）</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzDemoDropdownItemComponent {}
