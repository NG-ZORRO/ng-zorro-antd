import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'nz-demo-slider-vertical',
  imports: [FormsModule, NzSliderModule],
  template: `
    <div [style]="{ height: '300px' }">
      <div [style]="style">
        <nz-slider nzVertical [ngModel]="30" />
      </div>
      <div [style]="style">
        <nz-slider nzVertical nzRange [nzStep]="10" [ngModel]="[20, 50]" />
      </div>
      <div [style]="style">
        <nz-slider nzVertical nzRange [nzMarks]="marks" [ngModel]="[26, 37]" />
      </div>
    </div>
  `
})
export class NzDemoSliderVerticalComponent {
  style = {
    float: 'left',
    height: '300px',
    marginLeft: '70px'
  };

  marks = {
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
