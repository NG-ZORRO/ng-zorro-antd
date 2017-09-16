import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nz-demo-layout-is-fullscreen',
  template: `
    <label>isFullscreen</label>
    <nz-switch [(ngModel)]="isFullscreen"></nz-switch>
    <div class="components-layout-demo-is-fullscreen">
      <nz-layout class="layout" [isFullscreen]="isFullscreen">
        <nz-header>
          <div class="logo"></div>
          <ul nz-menu [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
            <li nz-menu-item>nav 1</li>
            <li nz-menu-item>nav 2</li>
            <li nz-menu-item>nav 3</li>
          </ul>
        </nz-header>
        <nz-content style="padding:0 50px;">
          <nz-breadcrumb style="margin:12px 0;">
            <nz-breadcrumb-item>Home</nz-breadcrumb-item>
            <nz-breadcrumb-item>List</nz-breadcrumb-item>
            <nz-breadcrumb-item>App</nz-breadcrumb-item>
          </nz-breadcrumb>
          <div style="background:#fff; padding: 24px; min-height: 280px;">Content</div>
        </nz-content>
        <nz-footer style="text-align: center; background-color:#404040;">Ant Design ©2017 Implement By Angular</nz-footer>
      </nz-layout>
    </div>
  `,
  styles: [
      `:host ::ng-deep .logo {
      width: 120px;
      height: 31px;
      background: #333;
      border-radius: 6px;
      margin: 16px 24px 16px 0;
      float: left;
    }

    .components-layout-demo-is-fullscreen {
      height: 600px;
      border: solid 1px #333;
      margin-top:10px;
    }
    `

  ]
})
export class NzDemoLayoutIsFullScreenComponent implements OnInit {
  isFullscreen = true;

  constructor() {
  }

  ngOnInit() {
  }
}
