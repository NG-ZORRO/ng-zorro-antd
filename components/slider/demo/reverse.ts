import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzMarks, NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-slider-reverse',
  imports: [FormsModule, NzSliderModule, NzSwitchModule],
  template: `
    <nz-slider [ngModel]="30" [nzReverse]="reverse" />
    <nz-slider nzRange [ngModel]="[20, 50]" [nzReverse]="reverse" />
    <nz-slider [nzMarks]="marks" [ngModel]="30" [nzReverse]="reverse" />
    Reversed:
    <nz-switch nzSize="small" [(ngModel)]="reverse" />
  `,
  styles: `
    .ant-slider-with-marks {
      margin-bottom: 44px;
    }
  `
})
export class NzDemoSliderReverseComponent {
  readonly reverse = signal(true);

  readonly marks: NzMarks = {
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
