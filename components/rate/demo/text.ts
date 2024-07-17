import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-rate-text',
  template: `
    <nz-rate [(ngModel)]="value" [nzTooltips]="tooltips"></nz-rate>
    @if (value) {
      <span class="ant-rate-text">{{ value ? tooltips[value - 1] : '' }}</span>
    }
  `
})
export class NzDemoRateTextComponent {
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 3;
}
