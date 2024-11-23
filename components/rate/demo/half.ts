import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-half',
  standalone: true,
  imports: [FormsModule, NzRateModule],
  template: `<nz-rate [ngModel]="2.5" nzAllowHalf></nz-rate>`
})
export class NzDemoRateHalfComponent {}
