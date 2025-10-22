import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-character',
  imports: [FormsModule, NzIconModule, NzRateModule],
  template: `
    <nz-rate [ngModel]="0" nzAllowHalf [nzCharacter]="characterIcon"></nz-rate>
    <br />
    <nz-rate [ngModel]="0" nzAllowHalf class="large" [nzCharacter]="characterEnLetter"></nz-rate>
    <br />
    <nz-rate [ngModel]="0" nzAllowHalf [nzCharacter]="characterZhLetter"></nz-rate>
    <ng-template #characterIcon><nz-icon nzType="heart" /></ng-template>
    <ng-template #characterZhLetter>好</ng-template>
    <ng-template #characterEnLetter>A</ng-template>
  `,
  styles: [
    `
      .large ::ng-deep .ant-rate-star {
        font-size: 36px;
      }
    `
  ]
})
export class NzDemoRateCharacterComponent {}
