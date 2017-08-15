import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nz-demo-rate-disabled',
  template: `<nz-rate [ngModel]="2" [nzDisabled]="true"></nz-rate>`,
  styles  : []
})
export class NzDemoRateDisabledComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

