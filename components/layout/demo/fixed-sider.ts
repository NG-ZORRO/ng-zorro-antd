import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-layout-fixed-sider',
  template: `
    <nz-layout>
      <nz-sider style="overflow: auto; height: 100vh; position: fixed; left: 0">
        <div class="logo">
        </div>
        <ul nz-menu [nzTheme]="'dark'" [nzMode]="'inline'">
          <li nz-menu-item><span><i nz-icon type="file"></i><span class="nav-text">nav 1</span></span></li>
          <li nz-menu-item><span><i nz-icon type="video-camera"></i><span class="nav-text">nav 2</span></span></li>
          <li nz-menu-item><span><i nz-icon type="upload"></i><span class="nav-text">nav 3</span></span></li>
          <li nz-menu-item><span><i nz-icon type="bar-chart"></i><span class="nav-text">nav 4</span></span></li>
          <li nz-menu-item><span><i nz-icon type="cloud-o"></i><span class="nav-text">nav 5</span></span></li>
          <li nz-menu-item><span><i nz-icon type="appstore-o"></i><span class="nav-text">nav 6</span></span></li>
          <li nz-menu-item><span><i nz-icon type="team"></i><span class="nav-text">nav 7</span></span></li>
          <li nz-menu-item><span><i nz-icon type="shop"></i><span class="nav-text">nav 8</span></span></li>
        </ul>
      </nz-sider>
      <nz-layout style="margin-left: 200">
        <nz-header style="background: #fff; padding:0;"></nz-header>
        <nz-content style="margin:24px 16px 0;overflow: initial">
        <div style="padding: 24px; background: #fff; text-align: center">
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
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />
          content
        </div>
        </nz-content>
        <nz-footer style="text-align: center;">Ant Design ©2017 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
  `,
  styles  : [ `
      .logo {
        height: 32px;
        background: rgba(255,255,255,.2);
        margin: 16px;
      }
  ` ]
})
export class NzDemoLayoutFixedSiderComponent {
}
