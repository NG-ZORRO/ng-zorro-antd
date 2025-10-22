import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'nz-demo-flex-gap',
  imports: [FormsModule, NzButtonModule, NzFlexModule, NzSegmentedModule, NzSliderModule],
  template: `
    <div class="segment-wrapper">
      <span>Select gap:</span>
      <nz-segmented [nzOptions]="gapSegment" [(ngModel)]="selectedGap"></nz-segmented>
    </div>
    @if (selectedGap === 'custom') {
      <nz-slider [nzMin]="0" [nzMax]="100" [(ngModel)]="customGapValue" />
    }
    <div nz-flex [nzGap]="selectedGap === 'custom' ? customGapValue : selectedGap">
      <button nz-button nzType="primary">Primary</button>
      <button nz-button nzType="dashed">Dashed</button>
      <button nz-button nzType="default">Default</button>
      <button nz-button nzType="link">Link</button>
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
    `
  ]
})
export class NzDemoFlexGapComponent {
  public gapSegment: string[] = ['small', 'middle', 'large', 'custom'];
  public selectedGap = 'small';
  public customGapValue = 0;
}
