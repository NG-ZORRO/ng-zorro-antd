import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-button-ghost',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div style="background: rgb(190, 200, 200);padding: 26px 16px 16px;">
      <button nz-button nzType="primary" nzGhost>Primary</button>
      <button nz-button nzType="default" nzGhost>Default</button>
      <button nz-button nzType="dashed" nzGhost>Dashed</button>
      <button nz-button nzType="danger" nzGhost>Danger</button>
    </div>
  `,
  styles       : [
      `
      [id^=components-button-demo-] [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }

      [id^=components-button-demo-] nz-button-group [nz-button] {
        margin-right: 0;
      }
    `
  ]
})
export class NzDemoButtonGhostComponent {
}
