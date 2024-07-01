import { Component } from '@angular/core';

import { presetColors } from 'ng-zorro-antd/core/color';

@Component({
  selector: 'nz-demo-tag-borderless',
  template: `
    <ng-container *ngFor="let color of tagColors">
      <nz-tag [nzColor]="color" [nzBordered]="false">{{ color }}</nz-tag>
    </ng-container>
  `
})
export class NzDemoTagBorderlessComponent {
  public tagColors = presetColors;
}
