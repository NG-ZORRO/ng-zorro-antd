import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-reverse',
  template: `
    <div>
      <nz-slider [ngModel]="30" [nzReverse]="reverse"></nz-slider>
      <nz-slider nzRange [ngModel]="[20, 50]" [nzReverse]="reverse"></nz-slider>
      Reversed: <nz-switch nzSize="small" [(ngModel)]="reverse"></nz-switch>
    </div>
  `,
  styles: [
    `
      h4 {
        margin: 0 0 16px;
      }

      .ant-slider-with-marks {
        margin-bottom: 44px;
      }
    `
  ]
})
export class NzDemoSliderReverseComponent {
  reverse = true;
}
