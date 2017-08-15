import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-disabled',
  template: `
    <label nz-checkbox [nzDisabled]="true" [ngModel]="false">
    </label>
    <br>
    <label nz-checkbox [nzDisabled]="true" [ngModel]="true">
    </label>`,
  styles  : []
})
export class NzDemoCheckboxDisabledComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

