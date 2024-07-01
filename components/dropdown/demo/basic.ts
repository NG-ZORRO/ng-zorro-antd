import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-basic',
  template: `
    <a nz-dropdown [nzDropdownMenu]="menu">
      Hover me
      <span nz-icon nzType="down"></span>
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu nzSelectable>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-menu-item>3rd menu item</li>
        <li nz-menu-item nzDanger>4th danger item</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzDemoDropdownBasicComponent {}
