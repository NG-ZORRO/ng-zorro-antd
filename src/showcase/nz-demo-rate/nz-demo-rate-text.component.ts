import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-rate-text',
  template: `
    <nz-rate [(ngModel)]="value" nzAllowHalf></nz-rate>
    <span *ngIf="value" class="ant-rate-text">{{value}} 星</span>
  `,
  styles  : []
})
export class NzDemoRateTextComponent implements OnInit {
  value = 3;

  constructor() {
  }

  ngOnInit() {
  }
}

