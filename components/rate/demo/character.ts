import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-rate-character',
  template: `
    <nz-rate [ngModel]="0" nzAllowHalf>
      <ng-template #character>
        <i class="anticon anticon-heart"></i>
      </ng-template>
    </nz-rate>
    <br>
    <nz-rate [ngModel]="0" nzAllowHalf class="large">
      <ng-template #character>
        A
      </ng-template>
    </nz-rate>
    <br>
    <nz-rate [ngModel]="0" nzAllowHalf>
      <ng-template #character>
        好
      </ng-template>
    </nz-rate>
  `,
  styles  : [
      `
      .large ::ng-deep .ant-rate-star {
        font-size: 36px;
      }
    `
  ]
})
export class NzDemoRateCharacterComponent {
}
