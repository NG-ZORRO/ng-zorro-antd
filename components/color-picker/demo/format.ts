import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-format',
  imports: [FormsModule, NzColorPickerModule],
  template: `
    <div class="format"><nz-color-picker nzFormat="hex" [(ngModel)]="hex" /> HEX: {{ hex() }} </div>
    <div class="format"><nz-color-picker nzFormat="hsb" [(ngModel)]="hsb" /> HSB: {{ hsb() }} </div>
    <div class="format"><nz-color-picker nzFormat="rgb" [(ngModel)]="rgb" /> RGB: {{ rgb() }} </div>
  `,
  styles: `
    .format {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    nz-color-picker {
      margin-right: 8px;
    }
  `
})
export class NzDemoColorPickerFormatComponent {
  readonly hex = signal('#1677ff');
  readonly hsb = signal('hsb(215, 91%, 100%)');
  readonly rgb = signal('rgb(22, 119, 255)');
}
