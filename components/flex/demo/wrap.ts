import { Component } from '@angular/core';

import { NzWrap } from 'ng-zorro-antd/flex';

@Component({
  selector: 'nz-demo-flex-wrap',
  template: `
    <div class="segment-wrapper">
      <span>Select wrap:</span>
      <nz-segmented [nzOptions]="wrapSegment" [(ngModel)]="selectedWrap"></nz-segmented>
    </div>
    <div class="btn-wrapper" nz-flex [nzGap]="'middle'" [nzWrap]="wrapSegment[selectedWrap]">
      <ng-container *ngFor="let _ of [].constructor(20); let index = index">
        <button style="width: 100px" nz-button nzType="primary">Button {{ index + 1 }}</button>
      </ng-container>
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
  public wrapSegment: NzWrap[] = ['wrap', 'wrap-reverse', 'nowrap'];
  public selectedWrap = 0;
}
