import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-ghost',
  template: `
    <div style="background: rgb(190, 200, 200);padding: 26px 16px 16px;">
      <button nz-button nzType="primary" nzGhost>Primary</button>
      <button nz-button nzType="default" nzGhost>Default</button>
      <button nz-button nzType="dashed" nzGhost>Dashed</button>
      <a nz-button nzType="link" nzGhost>Link</a>
    </div>
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
export class NzDemoButtonGhostComponent {}
