import { Component } from '@angular/core';

import { presetColors } from 'ng-zorro-antd/core/color';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-tag-colorful',
  imports: [NzTagModule],
  template: `
    <h4 style="margin-bottom: 16px">Presets:</h4>
    <div>
      @for (color of presetColors; track color) {
        <nz-tag [nzColor]="color">{{ color }}</nz-tag>
      }
    </div>
    <h4 style="margin: 16px 0">Custom:</h4>
    <div>
      @for (color of customColors; track color) {
        <nz-tag [nzColor]="color">{{ color }}</nz-tag>
      }
    </div>
  `,
  styles: `
    .ant-tag {
      margin-bottom: 8px;
    }
  `
})
export class NzDemoTagColorfulComponent {
  readonly presetColors = presetColors;
  readonly customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
}
