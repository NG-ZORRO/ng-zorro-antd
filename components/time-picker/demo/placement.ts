import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { NzPlacement } from 'ng-zorro-antd/core/types';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-placement',
  imports: [FormsModule, NzTimePickerModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="placement">
      <label nz-radio-button nzValue="bottomLeft">bottomLeft</label>
      <label nz-radio-button nzValue="bottomRight">bottomRight</label>
      <label nz-radio-button nzValue="topLeft">topLeft</label>
      <label nz-radio-button nzValue="topRight">topRight</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-time-picker [nzPlacement]="placement()" />
    <br />
  `,
  styles: `
    nz-time-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoTimePickerPlacementComponent {
  readonly placement = signal<NzPlacement>('bottomLeft');
}
