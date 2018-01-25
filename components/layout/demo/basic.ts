import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-layout-basic',
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
  styles  : [ `
    :host {
      text-align: center;
    }

    :host ::ng-deep .ant-layout-header,
    :host ::ng-deep .ant-layout-footer {
      background: #7dbcea;
      color: #fff;
    }

    :host ::ng-deep .ant-layout-footer {
      line-height: 1.5;
    }

    :host ::ng-deep .ant-layout-sider {
      background: #3ba0e9;
      color: #fff;
      line-height: 120px;
    }

    :host ::ng-deep .ant-layout-content {
      background: rgba(16, 142, 233, 1);
      color: #fff;
      min-height: 120px;
      line-height: 120px;
    }

    :host > ::ng-deep .ant-layout {
      margin-bottom: 48px;
    }

    :host ::ng-deep .ant-layout:last-child {
      margin: 0;
    }
  ` ]
})
export class NzDemoLayoutBasicComponent {
}
