import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-layout-fixed-sider',
  template: `
    <nz-layout class="left-layout">
      <nz-sider>
        <div class="logo"></div>
        <ul nz-menu nzTheme="dark" nzMode="inline">
          <li nz-menu-item>
            <i nz-icon nzType="file"></i>
            <span>nav 1</span>
          </li>
          <li nz-menu-item>
            <i nz-icon nzType="video-camera"></i>
            <span>nav 2</span>
          </li>
          <li nz-menu-item>
            <i nz-icon nzType="upload"></i>
            <span>nav 3</span>
          </li>
          <li nz-menu-item>
            <i nz-icon nzType="bar-chart"></i>
            <span>nav 4</span>
          </li>
          <li nz-menu-item>
            <i nz-icon nzType="cloud-o"></i>
            <span>nav 5</span>
          </li>
          <li nz-menu-item>
            <i nz-icon nzType="appstore-o"></i>
            <span>nav 6</span>
          </li>
          <li nz-menu-item>
            <i nz-icon nzType="team"></i>
            <span>nav 7</span>
          </li>
          <li nz-menu-item>
            <i nz-icon nzType="shop"></i>
            <span>nav 8</span>
          </li>
        </ul>
      </nz-sider>
      <nz-layout class="right-layout">
        <nz-header></nz-header>
        <nz-content>
          <div class="inner-content">
            ...
            <br />
            Really
            <br />...<br />...<br />...<br />
            long
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />... <br />...<br />...<br />...<br />...<br />...<br />
            content
          </div>
        </nz-content>
        <nz-footer>Ant Design ©2019 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
  `,
  styles: [
    `
      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }

      .left-layout {
        height: 100vh;
      }

      nz-sider {
        overflow: auto;
        height: 100%;
        position: fixed;
        left: 0;
      }

      .right-layout {
        margin-left: 200px;
      }

      nz-header {
        background: #fff;
        padding: 0;
      }

      nz-content {
        margin: 24px 16px 0;
        overflow: initial;
      }

      .inner-content {
        padding: 24px;
        background: #fff;
        text-align: center;
      }

      nz-footer {
        text-align: center;
      }
    `
  ]
})
export class NzDemoLayoutFixedSiderComponent {}
