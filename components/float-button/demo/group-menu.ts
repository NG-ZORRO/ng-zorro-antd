import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-float-button-group-menu',
  template: `
    <div class="menu">
      <nz-float-button-group
        [nzIcon]="icon"
        nzType="primary"
        nzTrigger="click"
        style="right: 24px"
        (nzOnOpenChange)="openChange($event)"
      >
        <nz-float-button></nz-float-button>
        <nz-float-button [nzIcon]="inner"></nz-float-button>
      </nz-float-button-group>
      <nz-float-button-group
        [nzIcon]="icon"
        nzType="primary"
        nzTrigger="hover"
        style="right: 94px"
        (nzOnOpenChange)="openChange($event)"
      >
        <nz-float-button></nz-float-button>
        <nz-float-button [nzIcon]="inner"></nz-float-button>
      </nz-float-button-group>
    </div>
    <ng-template #icon>
      <span nz-icon nzType="customer-service" nzTheme="outline"></span>
    </ng-template>
    <ng-template #inner>
      <span nz-icon nzType="comment" nzTheme="outline"></span>
    </ng-template>
  `,
  styles: [
    `
      .menu {
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
export class NzDemoFloatButtonGroupMenuComponent {
  openChange(status: boolean): void {
    console.log(status);
  }
}
