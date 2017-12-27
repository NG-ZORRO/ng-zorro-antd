import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-menu-theme',
  template: `
    <nz-switch [(ngModel)]="theme">
      <span checked>Dark</span>
      <span unchecked>Light</span>
    </nz-switch>
    <br>
    <br>
    <ul nz-menu [nzMode]="'inline'" style="width: 240px;" [nzTheme]="theme?'dark':'light'">
      <li nz-submenu nzOpen>
        <span title><i class="anticon anticon-mail"></i> Navigation One</span>
        <ul>
          <li nz-menu-group>
            <span title>Item 1</span>
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group>
            <span title>Item 2</span>
            <ul>
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu>
        <span title><i class="anticon anticon-appstore"></i> Navigation Two</span>
        <ul>
          <li nz-menu-item>Option 5</li>
          <li nz-menu-item>Option 6</li>
          <li nz-submenu>
            <span title>Submenu</span>
            <ul>
              <li nz-menu-item>Option 7</li>
              <li nz-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu>
        <span title><i class="anticon anticon-setting"></i> Navigation Three</span>
        <ul>
          <li nz-menu-item>Option 9</li>
          <li nz-menu-item>Option 10</li>
          <li nz-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>`,
  styles  : []
})
export class NzDemoMenuThemeComponent {
  theme = true;
}
