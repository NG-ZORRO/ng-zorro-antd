import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-layout-side',
  template: `
    <nz-layout>
      <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed">
        <div class="logo">
        </div>
        <ul nz-menu [nzTheme]="'dark'" [nzMode]="'inline'" [nzInlineCollapsed]="isCollapsed">
          <li nz-submenu>
            <span title><i class="anticon anticon-user"></i><span class="nav-text">User</span></span>
            <ul>
              <li nz-menu-item>Tom</li>
              <li nz-menu-item>Bill</li>
              <li nz-menu-item>Alex</li>
            </ul>
          </li>
          <li nz-submenu>
            <span title><i class="anticon anticon-team"></i><span class="nav-text">Team</span></span>
            <ul>
              <li nz-menu-item>Team 1</li>
              <li nz-menu-item>Team 2</li>
            </ul>
          </li>
          <li nz-menu-item><span><i class="anticon anticon-file"></i><span class="nav-text">File</span></span></li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header style="background: #fff; padding:0;"></nz-header>
        <nz-content style="margin:0 16px;">
          <nz-breadcrumb style="margin:16px 0;">
            <nz-breadcrumb-item>User</nz-breadcrumb-item>
            <nz-breadcrumb-item>Bill</nz-breadcrumb-item>
          </nz-breadcrumb>
          <div style="padding:24px; background: #fff; min-height: 360px;">
            Bill is a cat.
          </div>
        </nz-content>
        <nz-footer style="text-align: center;">Ant Design ©2017 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
  `,
  styles  : [
      `
      :host ::ng-deep .logo {
        height: 32px;
        background: rgba(255, 255, 255, .2);
        margin: 16px;
      }
    `
  ]
})
export class NzDemoLayoutSideComponent {
  isCollapsed = true;
}
