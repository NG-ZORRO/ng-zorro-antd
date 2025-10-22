import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-slider-basic',
  imports: [FormsModule, NzSliderModule, NzSwitchModule],
  template: `
    <nz-slider [(ngModel)]="value1" [nzDisabled]="disabled"></nz-slider>
    <nz-slider nzRange [(ngModel)]="value2" [nzDisabled]="disabled"></nz-slider>
    Disabled:
    <nz-switch nzSize="small" [(ngModel)]="disabled"></nz-switch>
  `
})
export class NzDemoSliderBasicComponent {
  disabled = false;
  value1 = 30;
  value2 = [20, 50];
}
