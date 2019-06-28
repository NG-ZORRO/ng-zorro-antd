import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-event',
  template: `
    <a nz-dropdown [nzDropdownMenu]="menu">
      Hover me, Click menu item
      <i nz-icon nzType="down"></i>
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item (click)="log('1st menu item')">1st menu item</li>
        <li nz-menu-item (click)="log('2nd menu item')">2nd menu item</li>
        <li nz-menu-item (click)="log('3rd menu item')">3rd menu item</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzDemoDropdownEventComponent {
  log(data: string): void {
    console.log(data);
  }
}
