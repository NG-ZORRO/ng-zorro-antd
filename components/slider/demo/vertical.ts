import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-vertical',
  template: `
    <div [ngStyle]="{ height: '300px' }">
      <div [ngStyle]="style">
        <nz-slider nzVertical [ngModel]="30"></nz-slider>
      </div>
      <div [ngStyle]="style">
        <nz-slider nzVertical nzRange [nzStep]="10" [ngModel]="[20, 50]"></nz-slider>
      </div>
      <div [ngStyle]="style">
        <nz-slider nzVertical nzRange [nzMarks]="marks" [ngModel]="[26, 37]"></nz-slider>
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
