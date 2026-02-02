import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'nz-demo-button-danger',
  imports: [NzButtonModule],
  template: `
    <button nz-button nzType="primary" nzDanger>Primary</button>
    <button nz-button nzType="default" nzDanger>Default</button>
    <button nz-button nzType="dashed" nzDanger>Dashed</button>
    <button nz-button nzType="text" nzDanger>Text</button>
    <a nz-button nzType="link" nzDanger>Link</a>
  `,
  styles: `
    [nz-button] {
      margin-right: 8px;
      margin-bottom: 12px;
    }
  `
})
export class NzDemoButtonDangerComponent {}
