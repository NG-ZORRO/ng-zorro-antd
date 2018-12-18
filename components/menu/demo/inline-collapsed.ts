import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-menu-inline-collapsed',
  template: `
    <div style="width: 240px;">
      <button nz-button [nzType]="'primary'" (click)="toggleCollapsed()" style="margin-bottom: 10px;">
        <i nz-icon [type]="isCollapsed?'menu-unfold':'menu-fold'"></i>
      </button>
      <ul nz-menu [nzMode]="'inline'" nzTheme='dark' [nzInlineCollapsed]="isCollapsed">
        <li nz-menu-item nz-tooltip nzPlacement="right" [nzTitle]="isCollapsed ? 'Navigation One' : ''">
          <span title>
            <i nz-icon type="mail"></i>
            <span>Navigation One</span>
          </span>
        </li>
        <li nz-submenu>
          <span title>
            <i nz-icon type="appstore"></i>
            <span>Navigation Two</span>
          </span>
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
          <span title>
            <i nz-icon type="setting"></i>
            <span>Navigation Three</span>
          </span>
          <ul>
            <li nz-menu-item>Option 9</li>
            <li nz-menu-item>Option 10</li>
            <li nz-menu-item>Option 11</li>
          </ul>
        </li>
      </ul>
    </div>
  `
})
export class NzDemoMenuInlineCollapsedComponent {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
