import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-rate-customize',
  template: `
    <nz-rate [ngModel]="2" [nzCharacter]="characterNumber"></nz-rate>
    <br />
    <nz-rate [ngModel]="3" [nzCharacter]="characterIcon"></nz-rate>
    <br />
    <ng-template #characterNumber let-index>
      {{ index + 1 }}
    </ng-template>
    <ng-template #characterIcon let-index>
      <ng-container [ngSwitch]="index">
        <i nz-icon nzType="frown" *ngSwitchCase="0"></i>
        <i nz-icon nzType="frown" *ngSwitchCase="1"></i>
        <i nz-icon nzType="meh" *ngSwitchCase="2"></i>
        <i nz-icon nzType="smile" *ngSwitchCase="3"></i>
        <i nz-icon nzType="smile" *ngSwitchCase="4"></i>
      </ng-container>
    </ng-template>
  `,
  styles: [
    `
      .large ::ng-deep .ant-rate-star {
        font-size: 36px;
      }
    `
  ]
})
export class NzDemoRateCustomizeComponent {}
