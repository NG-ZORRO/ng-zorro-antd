import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-basic',
  imports: [FormsModule, NzRateModule],
  template: `<nz-rate [ngModel]="0"></nz-rate>`
})
export class NzDemoRateBasicComponent {}
