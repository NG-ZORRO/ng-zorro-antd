import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-menu-inline-collapsed',
  template: `
    <div class="wrapper">
      <button nz-button nzType="primary" (click)="toggleCollapsed()">
        <i nz-icon [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"></i>
      </button>
      <ul nz-menu nzMode="inline" nzTheme="dark" [nzInlineCollapsed]="isCollapsed">
        <li nz-menu-item nz-tooltip nzTooltipPlacement="right" [nzTooltipTitle]="isCollapsed ? 'Navigation One' : ''" nzSelected>
          <i nz-icon nzType="mail"></i>
          <span>Navigation One</span>
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
    </div>
  `,
  styles: [
    `
      .wrapper {
        width: 240px;
      }

      button {
        margin-bottom: 12px;
      }
    `
  ]
})
export class NzDemoMenuInlineCollapsedComponent {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
