import { Component, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-dropdown-trigger-delay',
  imports: [NzDropdownModule, NzIconModule, NzButtonModule, NzFlexModule],
  template: `
    <div nz-flex nzVertical nzGap="middle">
      <a nz-dropdown nzTrigger="click" [nzDropdownMenu]="menu" [nzTriggerDelay]="defaultDelay()">
        Click me
        <nz-icon nzType="down" />
      </a>
      <nz-dropdown-menu #menu="nzDropdownMenu">
        <ul nz-menu>
          <li nz-menu-item>1st menu item</li>
          <li nz-menu-item>2nd menu item</li>
          <li nz-menu-divider></li>
          <li nz-menu-item nzDisabled>disabled menu item</li>
          <li nz-submenu nzTitle="sub menu">
            <ul>
              <li nz-menu-item>3rd menu item</li>
              <li nz-menu-item>4th menu item</li>
            </ul>
          </li>
          <li nz-submenu nzDisabled nzTitle="disabled sub menu">
            <ul>
              <li nz-menu-item>3rd menu item</li>
              <li nz-menu-item>4th menu item</li>
            </ul>
          </li>
        </ul>
      </nz-dropdown-menu>
      <button nz-button (click)="changeTriggerDelay()"> set nzTriggerDelay to 500ms </button>
    </div>
  `
})
export class NzDemoDropdownTriggerDelayComponent {
  protected readonly defaultDelay = signal(0);

  changeTriggerDelay(): void {
    this.defaultDelay.set(500);
  }
}
