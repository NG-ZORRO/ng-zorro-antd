import { Component } from '@angular/core';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-dropdown-basic',
  standalone: true,
  imports: [NzDropDownModule, NzIconModule],
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
