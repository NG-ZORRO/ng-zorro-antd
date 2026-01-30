import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzToCssUnitPipe } from 'ng-zorro-antd/pipes';
import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'nz-demo-pipes-css-unit',
  imports: [FormsModule, NzSliderModule, NzToCssUnitPipe],
  template: `
    <nz-slider [(ngModel)]="radiusValue" [nzMax]="100" [nzMin]="0" />

    <div class="wrap">
      <div class="box" [style.border-radius]="radiusValue | nzToCssUnit">Default</div>
      <div class="box" [style.border-radius]="radiusValue | nzToCssUnit: '%'">%</div>
      <div class="box" [style.border-radius]="radiusValue | nzToCssUnit: 'rem'">rem</div>
    </div>
  `,
  styles: `
    .wrap {
      display: flex;
    }
    .box {
      margin-top: 20px;
      margin-right: 20px;
      text-align: center;
      line-height: 50px;
      color: #fff;
      width: 50px;
      height: 50px;
      background: #4183c4;
    }
  `
})
export class NzDemoPipesCssUnitComponent {
  radiusValue = 0;
}
