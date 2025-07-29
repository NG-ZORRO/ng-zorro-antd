import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'nz-demo-float-button-group-placement',
  imports: [NzFloatButtonModule],
  template: `
    <div class="container">
      <div class="anchor">
        <nz-float-button-group
          class="up"
          nzIcon="up"
          nzType="primary"
          nzTrigger="click"
          (nzOnOpenChange)="openChange($event)"
          nzPlacement="top"
        >
          <nz-float-button></nz-float-button>
          <nz-float-button nzIcon="comment"></nz-float-button>
        </nz-float-button-group>
        <nz-float-button-group
          class="down"
          nzIcon="down"
          nzType="primary"
          nzTrigger="click"
          (nzOnOpenChange)="openChange($event)"
          nzPlacement="bottom"
        >
          <nz-float-button></nz-float-button>
          <nz-float-button nzIcon="comment"></nz-float-button>
        </nz-float-button-group>
        <nz-float-button-group
          class="left"
          nzIcon="left"
          nzType="primary"
          nzTrigger="click"
          (nzOnOpenChange)="openChange($event)"
          nzPlacement="left"
        >
          <nz-float-button></nz-float-button>
          <nz-float-button nzIcon="comment"></nz-float-button>
        </nz-float-button-group>
        <nz-float-button-group
          class="right"
          nzIcon="right"
          nzType="primary"
          nzTrigger="click"
          (nzOnOpenChange)="openChange($event)"
          nzPlacement="right"
        >
          <nz-float-button></nz-float-button>
          <nz-float-button nzIcon="comment"></nz-float-button>
        </nz-float-button-group>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        height: 300px;
        justify-content: center;
        align-items: center;

        .anchor {
          height: 100px;
          width: 100px;
          position: relative;

          .up {
            inset-inline-end: 30px;
            bottom: 80px;
          }
          .down {
            inset-inline-end: 30px;
            bottom: -20px;
          }
          .left {
            inset-inline-end: 80px;
            bottom: 30px;
          }
          .right {
            inset-inline-end: -20px;
            bottom: 30px;
          }
        }
        nz-float-button-group {
          position: absolute;
        }
      }
    `
  ]
})
export class NzDemoFloatButtonGroupPlacementComponent {
  openChange(status: boolean): void {
    console.log(status);
  }
}
