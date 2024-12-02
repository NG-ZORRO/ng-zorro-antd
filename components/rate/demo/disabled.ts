import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-disabled',
  imports: [FormsModule, NzRateModule],
  template: `<nz-rate [ngModel]="2" nzDisabled></nz-rate>`
})
export class NzDemoRateDisabledComponent {}
