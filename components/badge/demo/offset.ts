import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-offset',
  template: `
    <a>
      <nz-badge [nzCount]="5" [nzOffset]="[10, 10]">
        <a class="head-example"></a>
      </nz-badge>
    </a>
  `,
  styles: [
    `
      .head-example {
        width: 42px;
        height: 42px;
        border-radius: 4px;
        background: #eee;
        display: inline-block;
        vertical-align: middle;
      }
    `
  ]
})
export class NzDemoBadgeOffsetComponent {}
