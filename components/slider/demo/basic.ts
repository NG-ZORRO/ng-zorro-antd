import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-slider-basic',
  imports: [FormsModule, NzSliderModule, NzSwitchModule],
  template: `
    <nz-slider [(ngModel)]="value1" [nzDisabled]="disabled" />
    <nz-slider nzRange [(ngModel)]="value2" [nzDisabled]="disabled" />
    Disabled:
    <nz-switch nzSize="small" [(ngModel)]="disabled" />
  `
})
export class NzDemoSliderBasicComponent {
  readonly disabled = signal(false);
  readonly value1 = signal(30);
  readonly value2 = signal([20, 50]);
}
