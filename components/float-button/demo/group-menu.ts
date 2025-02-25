import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-float-button-group-menu',
  imports: [NzFloatButtonModule, NzIconModule],
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
      <nz-icon nzType="customer-service" nzTheme="outline"></nz-icon>
    </ng-template>
    <ng-template #inner>
      <nz-icon nzType="comment" nzTheme="outline"></nz-icon>
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
