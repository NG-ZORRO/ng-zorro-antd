import { Component } from '@angular/core';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'nz-demo-badge-colorful',
  imports: [NzBadgeModule, NzDividerModule],
  template: `
    <nz-divider nzOrientation="left" nzText="Presets" />
    @for (color of presets; track color) {
      <div>
        <nz-badge [nzColor]="color" [nzText]="color" />
      </div>
    }

    <nz-divider nzOrientation="left" nzText="Custom" />
    @for (color of customColors; track color) {
      <div>
        <nz-badge [nzColor]="color" [nzText]="color" />
      </div>
    }
  `
})
export class NzDemoBadgeColorfulComponent {
  readonly presets = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
  ];
  readonly customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
}
