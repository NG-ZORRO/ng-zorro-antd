import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'nz-demo-layout-responsive',
  imports: [NzIconModule, NzMenuModule, NzLayoutModule],
  template: `
    <nz-layout>
      <nz-sider nzCollapsible nzBreakpoint="lg" [nzCollapsedWidth]="0">
        <div class="logo"></div>
        <ul nz-menu nzTheme="dark" nzMode="inline">
          <li nz-menu-item>
            <nz-icon nzType="user" />
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
            <nz-icon nzType="user" />
            <span>nav 4</span>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header></nz-header>
        <nz-content>
          <div class="inner-content">Content</div>
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
export class NzDemoLayoutResponsiveComponent {
  protected readonly date = new Date();
}
