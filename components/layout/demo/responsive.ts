import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-layout-responsive',
  template: `
    <nz-layout class="layout">
      <nz-sider nzCollapsible nzBreakpoint="lg" [nzCollapsedWidth]="0">
        <div class="logo"></div>
        <ul nz-menu nzTheme="dark" nzMode="inline">
          <li nz-menu-item>
            <span nz-icon nzType="user"></span>
            <span>nav 1</span>
          </li>
          <li nz-menu-item>
            <span nz-icon nzType="video-camera"></span>
            <span>nav 2</span>
          </li>
          <li nz-menu-item>
            <span nz-icon nzType="upload"></span>
            <span>nav 3</span>
          </li>
          <li nz-menu-item>
            <span nz-icon nzType="user"></span>
            <span>nav 4</span>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header></nz-header>
        <nz-content>
          <div class="inner-content">Content</div>
        </nz-content>
        <nz-footer>Ant Design ©2020 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
  `,
  styles: [
    `
      .layout {
        min-height: 100vh;
      }

      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }

      nz-header {
        background: #fff;
        padding: 0;
      }

      nz-content {
        margin: 24px 16px 0;
      }

      .inner-content {
        padding: 24px;
        background: #fff;
        min-height: 360px;
      }

      nz-footer {
        text-align: center;
      }
    `
  ]
})
export class NzDemoLayoutResponsiveComponent {}
