import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-dot',
  template: `
    <nz-badge nzDot><i nz-icon type="notification"></i></nz-badge>
    <nz-badge nzDot><a>Link something</a></nz-badge>
  `,
  styles  : [
      `[nz-icon] {
      width: 16px;
      height: 16px;
      line-height: 16px;
      font-size: 16px;
    }`
  ]
})
export class NzDemoBadgeDotComponent {
}
