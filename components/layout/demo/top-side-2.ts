import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'nz-demo-layout-top-side-2',
  imports: [NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule],
  template: `
    <nz-layout>
      <nz-header>
        <div class="logo"></div>
        <ul nz-menu nzTheme="dark" nzMode="horizontal" class="header-menu">
          <li nz-menu-item nzSelected>nav 1</li>
          <li nz-menu-item>nav 2</li>
          <li nz-menu-item>nav 3</li>
        </ul>
      </nz-header>
      <nz-layout>
        <nz-sider nzWidth="200px" nzTheme="light">
          <ul nz-menu nzMode="inline" class="sider-menu">
            <li nz-submenu nzOpen nzIcon="user" nzTitle="subnav 1">
              <ul>
                <li nz-menu-item nzSelected>option1</li>
                <li nz-menu-item>option2</li>
                <li nz-menu-item>option3</li>
                <li nz-menu-item>option4</li>
              </ul>
            </li>
            <li nz-submenu nzTitle="subnav 2" nzIcon="laptop">
              <ul>
                <li nz-menu-item>option5</li>
                <li nz-menu-item>option6</li>
                <li nz-menu-item>option7</li>
                <li nz-menu-item>option8</li>
              </ul>
            </li>
            <li nz-submenu nzTitle="subnav 3" nzIcon="notification">
              <ul>
                <li nz-menu-item>option9</li>
                <li nz-menu-item>option10</li>
                <li nz-menu-item>option11</li>
                <li nz-menu-item>option12</li>
              </ul>
            </li>
          </ul>
        </nz-sider>
        <nz-layout class="inner-layout">
          <nz-breadcrumb>
            <nz-breadcrumb-item>Home</nz-breadcrumb-item>
            <nz-breadcrumb-item>List</nz-breadcrumb-item>
            <nz-breadcrumb-item>App</nz-breadcrumb-item>
          </nz-breadcrumb>
          <nz-content>Content</nz-content>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `,
  styles: [
    `
      .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 30px 16px 0;
        float: left;
      }

      .header-menu {
        line-height: 64px;
      }

      .sider-menu {
        height: 100%;
        border-right: 0;
      }

      .inner-layout {
        padding: 0 24px 24px;
      }

      nz-breadcrumb {
        margin: 16px 0;
      }

      nz-content {
        background: #fff;
        padding: 24px;
        min-height: 280px;
      }
    `
  ]
})
export class NzDemoLayoutTopSide2Component {}
