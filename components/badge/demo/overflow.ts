import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-overflow',
  template: `
    <nz-badge [nzCount]="99">
      <a class="head-example"></a>
    </nz-badge>
    <nz-badge [nzCount]="200">
      <a class="head-example"></a>
    </nz-badge>
    <nz-badge [nzCount]="200" [nzOverflowCount]="10">
      <a class="head-example"></a>
    </nz-badge>
    <nz-badge [nzCount]="10000" [nzOverflowCount]="999">
      <a class="head-example"></a>
    </nz-badge>
  `,
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }

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
export class NzDemoBadgeOverflowComponent {}
