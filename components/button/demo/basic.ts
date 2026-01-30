import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'nz-demo-button-basic',
  imports: [NzButtonModule],
  template: `
    <button nz-button nzType="primary">Primary Button</button>
    <button nz-button nzType="default">Default Button</button>
    <button nz-button nzType="dashed">Dashed Button</button>
    <button nz-button nzType="text">Text Button</button>
    <a nz-button nzType="link">Link Button</a>
  `,
  styles: `
    [nz-button] {
      margin-right: 8px;
      margin-bottom: 12px;
    }
  `
})
export class NzDemoButtonBasicComponent {}
