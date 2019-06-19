import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-menu-switch-mode',
  template: `
    <nz-switch [(ngModel)]="mode"></nz-switch>
    Change Mode
    <nz-divider nzType="vertical"></nz-divider>
    <nz-switch [(ngModel)]="dark"></nz-switch>
    Change Theme
    <br />
    <br />
    <ul nz-menu [nzMode]="mode ? 'vertical' : 'inline'" [nzTheme]="dark ? 'dark' : 'light'">
      <li nz-submenu nzTitle="Navigation One" nzIcon="mail">
        <ul>
          <li nz-menu-group nzTitle="Item 1">
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="Item 2">
            <ul>
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Navigation Two" nzIcon="appstore">
        <ul>
          <li nz-menu-item>Option 5</li>
          <li nz-menu-item>Option 6</li>
          <li nz-submenu nzTitle="Submenu">
            <ul>
              <li nz-menu-item>Option 7</li>
              <li nz-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Navigation Three" nzIcon="setting">
        <ul>
          <li nz-menu-item>Option 9</li>
          <li nz-menu-item>Option 10</li>
          <li nz-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `,
  styles: [
    `
      [nz-menu] {
        width: 240px;
      }
    `
  ]
})
export class NzDemoMenuSwitchModeComponent {
  mode = false;
  dark = false;
}
