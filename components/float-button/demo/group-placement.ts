import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-float-button-group-placement',
  imports: [NzFloatButtonModule, NzIconModule],
  template: `
    <div class="container">
      <div class="anchor">
        <nz-float-button-group
          class="up"
          [nzIcon]="up"
          nzType="primary"
          nzTrigger="click"
          (nzOnOpenChange)="openChange($event)"
          nzPlacement="top"
        >
          <nz-float-button></nz-float-button>
          <nz-float-button [nzIcon]="inner"></nz-float-button>
        </nz-float-button-group>
        <nz-float-button-group
          class="down"
          [nzIcon]="down"
          nzType="primary"
          nzTrigger="click"
          (nzOnOpenChange)="openChange($event)"
          nzPlacement="bottom"
        >
          <nz-float-button></nz-float-button>
          <nz-float-button [nzIcon]="inner"></nz-float-button>
        </nz-float-button-group>
        <nz-float-button-group
          class="left"
          [nzIcon]="left"
          nzType="primary"
          nzTrigger="click"
          (nzOnOpenChange)="openChange($event)"
          nzPlacement="left"
        >
          <nz-float-button></nz-float-button>
          <nz-float-button [nzIcon]="inner"></nz-float-button>
        </nz-float-button-group>
        <nz-float-button-group
          class="right"
          [nzIcon]="right"
          nzType="primary"
          nzTrigger="click"
          (nzOnOpenChange)="openChange($event)"
          nzPlacement="right"
        >
          <nz-float-button></nz-float-button>
          <nz-float-button [nzIcon]="inner"></nz-float-button>
        </nz-float-button-group>
      </div>
      <ng-template #inner>
        <nz-icon nzType="comment" nzTheme="outline"></nz-icon>
      </ng-template>
      <ng-template #up>
        <nz-icon nzType="up" nzTheme="outline" />
      </ng-template>
      <ng-template #down>
        <nz-icon nzType="down" nzTheme="outline" />
      </ng-template>
      <ng-template #left>
        <nz-icon nzType="left" nzTheme="outline" />
      </ng-template>
      <ng-template #right>
        <nz-icon nzType="right" nzTheme="outline" />
      </ng-template>
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
