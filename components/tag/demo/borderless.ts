import { Component } from '@angular/core';

import { presetColors } from 'ng-zorro-antd/core/color';

@Component({
  selector: 'nz-demo-tag-borderless',
  template: `
    @for (color of tagColors; track color) {
      <nz-tag [nzColor]="color" [nzBordered]="false">{{ color }}</nz-tag>
    }
  `
})
export class NzDemoTagBorderlessComponent {
  public tagColors = presetColors;
}
