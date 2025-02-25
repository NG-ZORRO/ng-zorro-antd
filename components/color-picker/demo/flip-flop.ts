import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-flip-flop',
  imports: [FormsModule, NzButtonModule, NzColorPickerModule],
  template: `
    <nz-color-picker [nzFlipFlop]="flipFlop" [(ngModel)]="color"></nz-color-picker>
    <ng-template #flipFlop>
      <button nz-button nzType="primary" [style.background-color]="color">Color</button>
    </ng-template>
  `,
  styles: [
    `
      button {
        border: none;
      }
    `
  ]
})
export class NzDemoColorPickerFlipFlopComponent {
  color = '#1677ff';
}
