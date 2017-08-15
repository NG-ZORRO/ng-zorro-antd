import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nz-demo-rate-basic',
  template: `<nz-rate [ngModel]="0"></nz-rate>`,
  styles  : []
})
export class NzDemoRateBasicComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

