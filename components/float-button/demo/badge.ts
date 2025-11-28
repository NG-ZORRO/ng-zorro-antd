import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'nz-demo-float-button-badge',
  imports: [NzFloatButtonModule],
  template: `
    <div class="group">
      <nz-float-button nzShape="circle" [nzBadge]="{ nzDot: true }" style="inset-inline-end: 164px"></nz-float-button>
      <nz-float-button-group nzShape="circle" style="inset-inline-end: 94px">
        <nz-float-button [nzBadge]="{ nzCount: 5, nzColor: 'blue' }"></nz-float-button>
        <nz-float-button [nzBadge]="{ nzCount: 5 }"></nz-float-button>
      </nz-float-button-group>
      <nz-float-button-group nzShape="circle">
        <nz-float-button [nzBadge]="{ nzCount: 12 }" nzIcon="question-circle"></nz-float-button>
        <nz-float-button [nzBadge]="{ nzCount: 123, nzOverflowCount: 999 }"></nz-float-button>
        <nz-float-button-top [nzVisibilityHeight]="0" [nzBadge]="{ nzDot: true }"></nz-float-button-top>
      </nz-float-button-group>
    </div>
  `,
  styles: [
    `
      .group {
        height: 300px;
        position: relative;
      }
      nz-float-button-group {
        position: absolute;
      }
      nz-float-button {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonBadgeComponent {}
