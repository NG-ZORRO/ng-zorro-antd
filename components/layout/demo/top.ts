import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'nz-demo-layout-top',
  imports: [NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule],
  template: `
    <nz-layout>
      <nz-header>
        <div class="logo"></div>
        <ul nz-menu nzTheme="dark" nzMode="horizontal">
          <li nz-menu-item>nav 1</li>
          <li nz-menu-item>nav 2</li>
          <li nz-menu-item>nav 3</li>
        </ul>
      </nz-header>
      <nz-content>
        <nz-breadcrumb>
          <nz-breadcrumb-item>Home</nz-breadcrumb-item>
          <nz-breadcrumb-item>List</nz-breadcrumb-item>
          <nz-breadcrumb-item>App</nz-breadcrumb-item>
        </nz-breadcrumb>
        <div class="inner-content">Content</div>
      </nz-content>
      <nz-footer>Ant Design ©{{ date.getFullYear() }} Implement By Angular</nz-footer>
    </nz-layout>
  `,
  styles: `
    .logo {
      width: 120px;
      height: 31px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px 24px 16px 0;
      float: left;
    }

    [nz-menu] {
      line-height: 64px;
    }

    nz-breadcrumb {
      margin: 16px 0;
    }

    nz-content {
      padding: 0 50px;
    }

    nz-footer {
      text-align: center;
    }

    .inner-content {
      background: #fff;
      padding: 24px;
      min-height: 280px;
    }
  `
})
export class NzDemoLayoutTopComponent {
  protected readonly date = new Date();
}
