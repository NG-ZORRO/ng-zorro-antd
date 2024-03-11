import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-float-button-group',
  template: `
    <div class="group">
      <nz-float-button-group nzShape="circle" style="right: 24px">
        <nz-float-button [nzIcon]="icon"></nz-float-button>
        <nz-float-button></nz-float-button>
        <nz-float-button-top [nzVisibilityHeight]="600"></nz-float-button-top>
        <nz-float-button [nzIcon]="customer"></nz-float-button>
      </nz-float-button-group>
      <nz-float-button-group nzShape="square" style="right: 94px">
        <nz-float-button [nzIcon]="icon"></nz-float-button>
        <nz-float-button></nz-float-button>
        <nz-float-button-top [nzVisibilityHeight]="600"></nz-float-button-top>
        <nz-float-button [nzIcon]="customer"></nz-float-button>
      </nz-float-button-group>
    </div>
    <ng-template #icon>
      <span nz-icon nzType="question-circle" nzTheme="outline"></span>
    </ng-template>
    <ng-template #customer>
      <span nz-icon nzType="customer-service" nzTheme="outline"></span>
    </ng-template>
  `,
  styles: [
    `
      .group {
        height: 300px;
        position: relative;
      }
      nz-float-button-group,
      nz-float-button {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonGroupComponent {}
