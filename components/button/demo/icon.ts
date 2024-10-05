import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-button-icon',
  standalone: true,
  imports: [NzButtonModule, NzIconModule],
  template: `
    <button nz-button nzType="primary" nzShape="circle">
      <span nz-icon nzType="search"></span>
    </button>
    <button nz-button nzType="primary" nzShape="circle">A</button>
    <button nz-button nzType="primary">
      <span nz-icon nzType="search"></span>
      Search
    </button>
    <button nz-button nzType="default" nzShape="circle">
      <span nz-icon nzType="search"></span>
    </button>
    <button nz-button nzType="default">
      <span nz-icon nzType="search"></span>
      Search
    </button>
    <br />
    <button nz-button nzType="default" nzShape="circle"><span nz-icon nzType="search"></span></button>
    <button nz-button nzType="default">
      <span nz-icon nzType="search"></span>
      Search
    </button>
    <button nz-button nzType="dashed" nzShape="circle"><span nz-icon nzType="search"></span></button>
    <button nz-button nzType="dashed">
      <span nz-icon nzType="search"></span>
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
