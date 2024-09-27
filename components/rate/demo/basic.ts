import { Component } from '@angular/core';

import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-basic',
  standalone: true,
  imports: [NzRateModule],
  template: `<nz-rate [ngModel]="0"></nz-rate>`
})
export class NzDemoRateBasicComponent {}
