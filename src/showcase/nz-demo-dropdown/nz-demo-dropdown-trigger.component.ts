import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-dropdown-trigger',
  template: `
    <nz-dropdown>
      <a class="ant-dropdown-link" nz-dropdown>
        Hover me, Click menu item <i class="anticon anticon-down"></i>
      </a>
      <ul nz-menu>
        <li nz-menu-item (click)="log('1st menu item')">1st menu item</li>
        <li nz-menu-item (click)="log('2nd menu item')">2nd menu item</li>
        <li nz-menu-item (click)="log('3rd menu item')">3rd menu item</li>
      </ul>
    </nz-dropdown>`,
  styles  : []
})
export class NzDemoDropDownTriggerComponent {
  log(data) {
    console.log(data);
  }
}
