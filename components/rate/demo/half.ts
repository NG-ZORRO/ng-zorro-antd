import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-rate-half',
  template: `
    <nz-rate [ngModel]="2.5" nzAllowHalf></nz-rate>
  `
})
export class NzDemoRateHalfComponent {}
