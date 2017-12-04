import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-ghost',
  template: `
    <div style="background: rgb(190, 200, 200);padding: 26px 16px 16px;">
      <button nz-button [nzType]="'primary'" nzGhost>
        <span>Primary</span>
      </button>
      <button nz-button [nzType]="'default'" nzGhost>
        <span>Default</span>
      </button>
      <button nz-button [nzType]="'dashed'" nzGhost>
        <span>Dashed</span>
      </button>
      <button nz-button [nzType]="'danger'" nzGhost>
        <span>Danger</span>
      </button>
    </div>
  `,
  styles  : []
})
export class NzDemoButtonGhostComponent { }
