import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-dot',
  template: `
    <nz-badge nzDot><span nz-icon nzType="notification"></span></nz-badge>
    <nz-badge nzDot [nzShowDot]="false"><span nz-icon nzType="notification"></span></nz-badge>
    <nz-badge nzDot>
      <a>Link something</a>
    </nz-badge>
  `,
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }

      [nz-icon] {
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
      }
    `
  ]
})
export class NzDemoBadgeDotComponent {}
