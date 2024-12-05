import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'nz-demo-button-ghost',
  imports: [NzButtonModule],
  template: `
    <div class="ghost-background">
      <button nz-button nzType="primary" nzGhost>Primary</button>
      <button nz-button nzType="default" nzGhost>Default</button>
      <button nz-button nzType="dashed" nzGhost>Dashed</button>
      <a nz-button nzType="link" nzGhost>Link</a>
    </div>
  `,
  styles: [
    `
      .ghost-background {
        padding: 8px;
        background: rgb(190, 200, 200);
      }

      [nz-button] {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoButtonGhostComponent {}
