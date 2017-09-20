import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-input-directive',
  template: `
  <div nz-row [nzGutter]="8">
    <div nz-col [nzSpan]="8">
      <input nz-input [(ngModel)]="inputValue" maxlength="10" placeholder="限制10个字">
    </div>
    <div nz-col [nzSpan]="8">
      <input nz-input [(ngModel)]="inputValue" [nzDisabled]="true" placeholder="disabled">
    </div>
    <div nz-col [nzSpan]="8">
      <input nz-input [(ngModel)]="inputValue" [nzReadonly]="true" maxlength="10" placeholder="readonly">
    </div>
  </div>
  <div style="margin-top: 16px;">
    <textarea nz-input [(ngModel)]="inputValueTwo"></textarea>
  </div>
  `,
  styles  : []
})
export class NzDemoInputDirectiveComponent implements OnInit {
  inputValue: string;
  inputValueTwo: string;

  constructor() {
  }

  ngOnInit() {
  }
}

