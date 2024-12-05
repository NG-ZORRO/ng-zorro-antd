import { Component } from '@angular/core';

import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'nz-demo-badge-colorful',
  imports: [NzBadgeModule],
  template: `
    <h4>Presets:</h4>
    @for (color of presets; track color) {
      <div>
        <nz-badge [nzColor]="color" [nzText]="color"></nz-badge>
      </div>
    }
    <br />
    <h4>Custom:</h4>
    @for (color of customColors; track color) {
      <div>
        <nz-badge [nzColor]="color" [nzText]="color"></nz-badge>
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
