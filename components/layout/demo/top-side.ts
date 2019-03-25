import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-layout-top-side',
  template: `
    <nz-layout class="layout">
      <nz-header>
        <div class="logo"></div>
        <ul nz-menu [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
          <li nz-menu-item>nav 1</li>
          <li nz-menu-item>nav 2</li>
          <li nz-menu-item>nav 3</li>
        </ul>
      </nz-header>
      <nz-content style="padding:0 50px;">
        <nz-breadcrumb style="margin:16px 0;">
          <nz-breadcrumb-item>Home</nz-breadcrumb-item>
          <nz-breadcrumb-item>List</nz-breadcrumb-item>
          <nz-breadcrumb-item>App</nz-breadcrumb-item>
        </nz-breadcrumb>
        <nz-layout style="padding:24px 0; background: #fff">
          <nz-sider [nzWidth]="200" style="background:#fff">
            <ul nz-menu [nzMode]="'inline'" style="height:100%">
              <li nz-submenu>
                <span title><i nz-icon type="user"></i>subnav 1</span>
                <ul>
                  <li nz-menu-item>option1</li>
                  <li nz-menu-item>option2</li>
                  <li nz-menu-item>option3</li>
                  <li nz-menu-item>option4</li>
                </ul>
              </li>
              <li nz-submenu>
                <span title><i nz-icon type="laptop"></i>subnav 2</span>
                <ul>
                  <li nz-menu-item>option5</li>
                  <li nz-menu-item>option6</li>
                  <li nz-menu-item>option7</li>
                  <li nz-menu-item>option8</li>
                </ul>
              </li>
              <li nz-submenu>
                <span title><i nz-icon type="notification"></i>subnav 3</span>
                <ul>
                  <li nz-menu-item>option9</li>
                  <li nz-menu-item>option10</li>
                  <li nz-menu-item>option11</li>
                  <li nz-menu-item>option12</li>
                </ul>
              </li>
            </ul>
          </nz-sider>
          <nz-content style="padding: 0 24px; min-height: 280px;">Content</nz-content>
        </nz-layout>
        <nz-footer style="text-align: center;">Ant Design ©2019 Implement By Angular</nz-footer>
      </nz-content>
    </nz-layout>
  `,
  styles: [
    `
      .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 28px 16px 0;
        float: left;
      }
    `
  ]
})
export class NzDemoLayoutTopSideComponent {}
