import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'nz-demo-layout-fixed-sider',
  imports: [NzIconModule, NzMenuModule, NzLayoutModule],
  template: `
    <nz-layout class="layout">
      <nz-sider>
        <div class="logo"></div>
        <ul nz-menu nzTheme="dark" nzMode="inline">
          <li nz-menu-item>
            <nz-icon nzType="file" />
            <span>nav 1</span>
          </li>
          <li nz-menu-item>
            <nz-icon nzType="video-camera" />
            <span>nav 2</span>
          </li>
          <li nz-menu-item>
            <nz-icon nzType="upload" />
            <span>nav 3</span>
          </li>
          <li nz-menu-item>
            <nz-icon nzType="bar-chart" />
            <span>nav 4</span>
          </li>
          <li nz-menu-item>
            <nz-icon nzType="cloud-o" />
            <span>nav 5</span>
          </li>
          <li nz-menu-item>
            <nz-icon nzType="appstore-o" />
            <span>nav 6</span>
          </li>
          <li nz-menu-item>
            <nz-icon nzType="team" />
            <span>nav 7</span>
          </li>
          <li nz-menu-item>
            <nz-icon nzType="shop" />
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
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            long
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            content
          </div>
        </nz-content>
        <nz-footer>Ant Design ©{{ date.getFullYear() }} Implement By Angular</nz-footer>
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

      .layout {
        min-height: 100vh;
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
export class NzDemoLayoutFixedSiderComponent {
  protected readonly date = new Date();
}
