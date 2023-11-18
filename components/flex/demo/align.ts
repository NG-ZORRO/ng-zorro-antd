import { Component } from '@angular/core';

import { NzAlign, NzJustify } from 'ng-zorro-antd/flex';

@Component({
  selector: 'nz-demo-flex-align',
  template: `
    <div class="segment-wrapper">
      <span>Select justify:</span>
      <nz-segmented [nzOptions]="justifySegment" [(ngModel)]="selectedJustification"></nz-segmented>
    </div>

    <div class="segment-wrapper">
      <span>Select align:</span>
      <nz-segmented [nzOptions]="alignSegment" [(ngModel)]="selectedLAlignment"></nz-segmented>
    </div>

    <div
      class="btn-wrappers"
      nz-flex
      [nzJustify]="justifySegment[selectedJustification]"
      [nzAlign]="alignSegment[selectedLAlignment]"
    >
      <button nz-button nzType="primary">Primary</button>
      <button nz-button nzType="primary">Primary</button>
      <button nz-button nzType="primary">Primary</button>
      <button nz-button nzType="primary">Primary</button>
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

      .btn-wrappers {
        block-size: 10rem;
        border: 1px solid var(--ant-primary-6);
      }
    `
  ]
})
export class NzDemoFlexAlignComponent {
  public justifySegment: NzJustify[] = [
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly'
  ];
  public alignSegment: NzAlign[] = ['flex-start', 'center', 'flex-end'];
  public selectedJustification = 0;
  public selectedLAlignment = 0;
}
