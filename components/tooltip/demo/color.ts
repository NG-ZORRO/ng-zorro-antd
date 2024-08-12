import { Component } from '@angular/core';

import { presetColors } from 'ng-zorro-antd/core/color';

@Component({
  selector: 'nz-demo-tooltip-color',
  template: `
    <nz-divider nzText="Preset" nzOrientation="left"></nz-divider>
    @for (color of presetColors; track color) {
      <button nz-button nz-tooltip [nzTooltipTitle]="color" [nzTooltipColor]="color">
        {{ color }}
      </button>
    }
    <nz-divider nzText="Custom" nzOrientation="left"></nz-divider>
    @for (color of customColors; track color) {
      <button nz-button nz-tooltip [nzTooltipTitle]="color" [nzTooltipColor]="color">
        {{ color }}
      </button>
    }
  `,
  styles: [
    `
      .ant-btn {
        margin-right: 8px;
        margin-bottom: 8px;
      }

      .ant-tag {
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoTooltipColorComponent {
  customColors: string[] = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
  presetColors = presetColors;
}
