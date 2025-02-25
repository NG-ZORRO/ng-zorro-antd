import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule, NzWrap } from 'ng-zorro-antd/flex';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-flex-wrap',
  imports: [FormsModule, NzButtonModule, NzFlexModule, NzSegmentedModule],
  template: `
    <div class="segment-wrapper">
      <span>Select wrap:</span>
      <nz-segmented [nzOptions]="wrapSegment" [(ngModel)]="selectedWrap"></nz-segmented>
    </div>
    <div class="btn-wrapper" nz-flex [nzGap]="'middle'" [nzWrap]="selectedWrap">
      @for (_ of array; track _) {
        <button style="width: 100px" nz-button nzType="primary">Button {{ _ }}</button>
      }
    </div>
  `,
  styles: [
    `
      .segment-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;

        margin-block-end: 1rem;
      }

      .btn-wrapper {
        overflow: auto;
        padding-block: 10px;
      }
    `
  ]
})
export class NzDemoFlexWrapComponent {
  wrapSegment: NzWrap[] = ['wrap', 'wrap-reverse', 'nowrap'];
  selectedWrap: NzWrap = 'wrap';
  array = Array.from({ length: 20 }, (_, index) => index + 1);
}
