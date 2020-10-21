import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-css-unit',
  template: `
    <nz-slider [(ngModel)]="radiusValue" [nzMax]="100" [nzMin]="0"></nz-slider>

    <div class="wrap">
      <div class="box" [style.border-radius]="radiusValue | nzToCssUnit">Default</div>
      <div class="box" [style.border-radius]="radiusValue | nzToCssUnit: '%'">%</div>
      <div class="box" [style.border-radius]="radiusValue | nzToCssUnit: 'rem'">rem</div>
    </div>
  `,
  styles: [
    `
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
  ]
})
export class NzDemoPipesCssUnitComponent {
  radiusValue = 0;
}
