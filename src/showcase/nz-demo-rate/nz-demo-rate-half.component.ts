import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nz-demo-rate-half',
  template: `<nz-rate [ngModel]="2.5" nzAllowHalf></nz-rate>`,
  styles  : []
})
export class NzDemoRateHalfComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

