import { Component } from '@angular/core';

import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'nz-demo-slider-reverse',
  template: `
    <div>
      <nz-slider [ngModel]="30" [nzReverse]="reverse"></nz-slider>
      <nz-slider nzRange [ngModel]="[20, 50]" [nzReverse]="reverse"></nz-slider>
      <nz-slider [nzMarks]="marks" [ngModel]="30" [nzReverse]="reverse"></nz-slider>
      Reversed:
      <nz-switch nzSize="small" [(ngModel)]="reverse"></nz-switch>
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

  marks: NzMarks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50'
      },
      label: '<strong>100°C</strong>'
    }
  };
}
