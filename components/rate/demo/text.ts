import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-rate-text',
  template: `
    <nz-rate [(ngModel)]="value" nzAllowHalf></nz-rate>
    <span *ngIf="value" class="ant-rate-text">{{ value }} stars</span>
  `
})
export class NzDemoRateTextComponent {
  value = 3;
}
