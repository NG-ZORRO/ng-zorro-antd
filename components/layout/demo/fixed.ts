import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-layout-fixed',
  template: `
    <nz-layout class="layout">
      <nz-header style="position:fixed; width:100%">
        <div class="logo"></div>
        <ul nz-menu [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
          <li nz-menu-item>nav 1</li>
          <li nz-menu-item>nav 2</li>
          <li nz-menu-item>nav 3</li>
        </ul>
      </nz-header>
      <nz-content style="padding:0 50px;margin-top:64px;">
        <nz-breadcrumb style="margin:16px 0;">
          <nz-breadcrumb-item>Home</nz-breadcrumb-item>
          <nz-breadcrumb-item>List</nz-breadcrumb-item>
          <nz-breadcrumb-item>App</nz-breadcrumb-item>
        </nz-breadcrumb>
        <div style="background:#fff; padding: 24px; min-height: 380px;">Content</div>
      </nz-content>
      <nz-footer style="text-align: center;">Ant Design ©2017 Implement By Angular</nz-footer>
    </nz-layout>
  `,
  styles  : [ `
    .logo {
      width: 120px;
      height: 31px;
      background: rgba(255,255,255,.2);
      margin: 16px 24px 16px 0;
      float: left;
    }
  ` ]
})
export class NzDemoLayoutFixedComponent {
}
