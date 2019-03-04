import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-icon',
  template: `
    <button nz-button nzType="primary" nzShape="circle"><i nz-icon type="search"></i></button>
    <button nz-button nzType="primary"><i nz-icon type="search"></i>Search</button>
    <button nz-button nzType="default" nzShape="circle"><i nz-icon type="search"></i></button>
    <button nz-button nzType="default"><i nz-icon type="search"></i>Search</button>
    <br>
    <button nz-button nzType="default" nzShape="circle"><i nz-icon type="search"></i></button>
    <button nz-button nzType="default"><i nz-icon type="search"></i>Search</button>
    <button nz-button nzType="dashed" nzShape="circle"><i nz-icon type="search"></i></button>
    <button nz-button nzType="dashed"><i nz-icon type="search"></i>Search</button>
  `,
  styles  : [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class NzDemoButtonIconComponent {
}
