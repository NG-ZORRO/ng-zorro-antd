import { Component } from '@angular/core';

import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-half',
  standalone: true,
  imports: [NzRateModule],
  template: `<nz-rate [ngModel]="2.5" nzAllowHalf></nz-rate>`
})
export class NzDemoRateHalfComponent {}
