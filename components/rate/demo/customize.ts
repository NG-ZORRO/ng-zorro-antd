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
        <span nz-icon nzType="frown" *ngSwitchCase="0"></span>
        <span nz-icon nzType="frown" *ngSwitchCase="1"></span>
        <span nz-icon nzType="meh" *ngSwitchCase="2"></span>
        <span nz-icon nzType="smile" *ngSwitchCase="3"></span>
        <span nz-icon nzType="smile" *ngSwitchCase="4"></span>
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
