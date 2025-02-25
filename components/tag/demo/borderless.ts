import { Component } from '@angular/core';

import { presetColors } from 'ng-zorro-antd/core/color';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-tag-borderless',
  imports: [NzTagModule],
  template: `
    @for (color of tagColors; track color) {
      <nz-tag [nzColor]="color" [nzBordered]="false">{{ color }}</nz-tag>
    }
  `
})
export class NzDemoTagBorderlessComponent {
  readonly tagColors = presetColors;
}
