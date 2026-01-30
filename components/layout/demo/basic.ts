import { Component } from '@angular/core';

import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'nz-demo-layout-basic',
  imports: [NzLayoutModule],
  template: `
    <nz-layout>
      <nz-header>Header</nz-header>
      <nz-content>Content</nz-content>
      <nz-footer>Footer</nz-footer>
    </nz-layout>

    <nz-layout>
      <nz-header>Header</nz-header>
      <nz-layout>
        <nz-sider>Sider</nz-sider>
        <nz-content>Content</nz-content>
      </nz-layout>
      <nz-footer>Footer</nz-footer>
    </nz-layout>

    <nz-layout>
      <nz-header>Header</nz-header>
      <nz-layout>
        <nz-content>Content</nz-content>
        <nz-sider>Sider</nz-sider>
      </nz-layout>
      <nz-footer>Footer</nz-footer>
    </nz-layout>

    <nz-layout>
      <nz-sider>Sider</nz-sider>
      <nz-layout>
        <nz-header>Header</nz-header>
        <nz-content>Content</nz-content>
        <nz-footer>Footer</nz-footer>
      </nz-layout>
    </nz-layout>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      text-align: center;
    }

    nz-header,
    nz-footer {
      text-align: center;
      background: #4096ff;
      color: #fff;
    }

    nz-header {
      height: 64px;
      padding-inline: 48px;
      line-height: 64px;
    }

    nz-sider {
      text-align: center;
      background: #1677ff;
      color: #fff;
      line-height: 120px;
    }

    nz-content {
      text-align: center;
      background: #0958d9;
      color: #fff;
      min-height: 120px;
      line-height: 120px;
    }

    :host > nz-layout {
      width: calc(50% - 8px);
      max-width: calc(50% - 8px);
      border-radius: 8px;
      overflow: hidden;
    }
  `
})
export class NzDemoLayoutBasicComponent {}
