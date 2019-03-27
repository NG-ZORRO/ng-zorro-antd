import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-layout-responsive',
  template: `
    <nz-layout>
      <nz-sider
        nzCollapsible
        [(nzCollapsed)]="isCollapsed"
        [nzBreakpoint]="'lg'"
        [nzCollapsedWidth]="0"
        [nzZeroTrigger]="zeroTrigger"
      >
        <div class="logo"></div>
        <ul nz-menu [nzTheme]="'dark'" [nzMode]="'inline'" [nzInlineCollapsed]="isCollapsed">
          <li nz-menu-item>
            <span><i nz-icon type="user"></i><span class="nav-text">nav 1</span></span>
          </li>
          <li nz-menu-item>
            <span><i nz-icon type="video-camera"></i><span class="nav-text">nav 2</span></span>
          </li>
          <li nz-menu-item>
            <span><i nz-icon type="upload"></i><span class="nav-text">nav 3</span></span>
          </li>
          <li nz-menu-item>
            <span><i nz-icon type="user"></i><span class="nav-text">nav 4</span></span>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header style="background: #fff; padding:0;"></nz-header>
        <nz-content style="margin:24px 16px 0;">
          <div style="padding:24px; background: #fff; min-height: 360px;">
            Content
          </div>
        </nz-content>
        <nz-footer style="text-align: center;">Ant Design ©2019 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
    <ng-template #zeroTrigger>
      <i nz-icon type="menu-fold" theme="outline"></i>
    </ng-template>
  `,
  styles: [
    `
      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }
    `
  ]
})
export class NzDemoLayoutResponsiveComponent {
  isCollapsed = false;
}
