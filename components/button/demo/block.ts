import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'nz-demo-button-block',
  imports: [NzButtonModule],
  template: `
    <button nz-button nzType="primary" nzBlock>Primary</button>
    <button nz-button nzType="default" nzBlock>Default</button>
    <button nz-button nzType="dashed" nzBlock>Dashed</button>
    <button nz-button nzType="text" nzBlock>Text</button>
    <a nz-button nzType="link" nzBlock>Link</a>
  `,
  styles: `
    [nz-button] {
      margin-bottom: 12px;
    }
  `
})
export class NzDemoButtonBlockComponent {}
