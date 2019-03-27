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
  styles: [
    `
      :host {
        text-align: center;
      }

      nz-header,
      nz-footer {
        background: #7dbcea;
        color: #fff;
      }

      nz-footer {
        line-height: 1.5;
      }

      nz-sider {
        background: #3ba0e9;
        color: #fff;
        line-height: 120px;
      }

      nz-content {
        background: rgba(16, 142, 233, 1);
        color: #fff;
        min-height: 120px;
        line-height: 120px;
      }

      nz-layout {
        margin-bottom: 48px;
      }

      nz-layout:last-child {
        margin: 0;
      }
    `
  ]
})
export class NzDemoLayoutBasicComponent {}
