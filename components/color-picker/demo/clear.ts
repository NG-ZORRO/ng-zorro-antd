import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-clear',
  imports: [FormsModule, NzColorPickerModule],
  template: `
    <nz-color-picker nzAllowClear nzTitle="Allow Clear" [(ngModel)]="color" />
    <span>{{ color() ?? 'null' }}</span>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `
})
export class NzDemoColorPickerClearComponent {
  readonly color = signal<string | null>('#1677ff');
}
