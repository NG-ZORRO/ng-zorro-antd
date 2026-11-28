import { Component } from '@angular/core';

import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-dropdown-selectable',
  imports: [NzDropdownModule, NzIconModule],
  template: `
    <a nz-dropdown [nzDropdownMenu]="menu">
      Selectable
      <nz-icon nzType="down" />
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu nzSelectable [nzSelectedKeys]="['3']">
        <li nz-menu-item nzKey="1">Item 1</li>
        <li nz-menu-item nzKey="2">Item 2</li>
        <li nz-menu-item nzKey="3">Item 3</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzDemoDropdownSelectableComponent {}
