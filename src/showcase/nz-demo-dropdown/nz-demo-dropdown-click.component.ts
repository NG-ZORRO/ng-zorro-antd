import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-click',
  template: `
    <nz-dropdown [nzTrigger]="'click'">
      <a href class="ant-dropdown-link" nz-dropdown>
        Click me <i class="anticon anticon-down"></i>
      </a>
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-menu-item>3rd menu item</li>
      </ul>
    </nz-dropdown>`,
  styles  : []
})
export class NzDemoDropDownClickComponent { }
