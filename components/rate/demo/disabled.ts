import { Component } from '@angular/core';

import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-disabled',
  standalone: true,
  imports: [NzRateModule],
  template: `<nz-rate [ngModel]="2" nzDisabled></nz-rate>`
})
export class NzDemoRateDisabledComponent {}
