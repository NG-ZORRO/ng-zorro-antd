import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-format',
  imports: [FormsModule, NzColorPickerModule],
  template: `
    <div class="format"> <nz-color-picker nzFormat="hex" [(ngModel)]="hex"></nz-color-picker> HEX: {{ hex }} </div>
    <div class="format"> <nz-color-picker nzFormat="hsb" [(ngModel)]="hsb"></nz-color-picker> HSB: {{ hsb }} </div>
    <div class="format"> <nz-color-picker nzFormat="rgb" [(ngModel)]="rgb"></nz-color-picker> RGB: {{ rgb }} </div>
  `,
  styles: [
    `
      .format {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
      }

      nz-color-picker {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoColorPickerFormatComponent {
  hex: string = '#1677ff';
  hsb: string = 'hsb(215, 91%, 100%)';
  rgb: string = 'rgb(22, 119, 255)';
}
