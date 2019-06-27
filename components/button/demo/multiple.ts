import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-multiple',
  template: `
    <button nz-button nzType="primary">primary</button>
    <button nz-button nzType="default">secondary</button>
    <button nz-button nz-dropdown [nzDropdownMenu]="menu">Actions<i nz-icon nzType="down"></i></button>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item>
          <a>1st item</a>
        </li>
        <li nz-menu-item>
          <a>2nd item</a>
        </li>
        <li nz-menu-item>
          <a>3rd item</a>
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class NzDemoButtonMultipleComponent {}
