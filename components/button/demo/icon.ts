import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-button-icon',
  imports: [NzButtonModule, NzIconModule],
  template: `
    <button nz-button nzType="primary" nzShape="circle">
      <nz-icon nzType="search" />
    </button>
    <button nz-button nzType="primary" nzShape="circle">A</button>
    <button nz-button nzType="primary">
      <nz-icon nzType="search" />
      Search
    </button>
    <button nz-button nzType="default" nzShape="circle">
      <nz-icon nzType="search" />
    </button>
    <button nz-button nzType="default">
      <nz-icon nzType="search" />
      Search
    </button>
    <br />
    <button nz-button nzType="default" nzShape="circle"><nz-icon nzType="search" /></button>
    <button nz-button nzType="default">
      <nz-icon nzType="search" />
      Search
    </button>
    <button nz-button nzType="dashed" nzShape="circle"><nz-icon nzType="search" /></button>
    <button nz-button nzType="dashed">
      <nz-icon nzType="search" />
      Search
    </button>
  `,
  styles: [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class NzDemoButtonIconComponent {}
