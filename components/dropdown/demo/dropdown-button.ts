import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-dropdown-dropdown-button',
  imports: [NzButtonModule, NzDropdownModule, NzFlexModule, NzIconModule, NzSpaceModule],
  template: `
    <div nz-flex nzGap="small" nzWrap="wrap">
      <nz-space-compact>
        <button nz-button (click)="log()">Dropdown</button>
        <button nz-button nz-dropdown [nzDropdownMenu]="menu" nzPlacement="bottomRight">
          <nz-icon nzType="ellipsis" />
        </button>
      </nz-space-compact>
      <nz-space-compact>
        <button nz-button (click)="log()">Dropdown</button>
        <button nz-button nz-dropdown [nzDropdownMenu]="menu" nzPlacement="bottomRight">
          <nz-icon nzType="user" />
        </button>
      </nz-space-compact>
      <nz-space-compact>
        <button nz-button disabled>Dropdown</button>
        <button nz-button disabled nz-dropdown [nzDropdownMenu]="menu" nzDisabled nzPlacement="bottomRight">
          <nz-icon nzType="ellipsis" />
        </button>
      </nz-space-compact>
      <button nz-button nz-dropdown [nzDropdownMenu]="menu">
        Button
        <nz-icon nzType="down" />
      </button>
    </div>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item>menu 1st menu item</li>
        <li nz-menu-item>menu 2nd menu item</li>
        <li nz-menu-item>menu 3rd menu item</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzDemoDropdownDropdownButtonComponent {
  log(): void {
    console.log('click dropdown button');
  }
}
