import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'nz-demo-slider-input-number',
  imports: [FormsModule, NzGridModule, NzInputNumberModule, NzSliderModule],
  template: `
    <nz-row nzGutter="8">
      <nz-col nzSpan="12">
        <nz-slider [nzMin]="1" [nzMax]="20" [ngModel]="value1()" (ngModelChange)="value1.set($event)" />
      </nz-col>
      <div nz-col nzSpan="4">
        <nz-input-number [nzMin]="1" [nzMax]="20" [ngModel]="value1()" (ngModelChange)="value1.set($event)" />
      </div>
    </nz-row>

    <nz-row nzGutter="8">
      <nz-col nzSpan="12">
        <nz-slider [nzMin]="0" [nzMax]="1" [nzStep]="0.01" [ngModel]="value2()" (ngModelChange)="value2.set($event)" />
      </nz-col>
      <nz-col nzSpan="4">
        <nz-input-number
          [nzMin]="0"
          [nzMax]="1"
          [nzStep]="0.01"
          [ngModel]="value2()"
          (ngModelChange)="value2.set($event)"
        />
      </nz-col>
    </nz-row>
  `
})
export class NzDemoSliderInputNumberComponent {
  readonly value1 = signal(1);
  readonly value2 = signal(0);
}
