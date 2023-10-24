import { Component } from '@angular/core';
import { nzDirection } from 'ng-zorro-antd/flex/typings';

@Component({
  selector: 'nz-demo-flex-basic',
  template: `
    <div class="segment-wrapper">
      <span>Select direction:</span>
      <nz-segmented [nzOptions]="layoutSegment" [(ngModel)]="selectedIndex"></nz-segmented>
    </div>

    <div nz-flex [nzDirection]="layoutSegment[selectedIndex]">
      <div class="flex-item"></div>
      <div class="flex-item even"></div>
      <div class="flex-item"></div>
      <div class="flex-item even"></div>
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

      .flex-item {
        inline-size: 25%;
        block-size: 54px;
        background-color: var(--ant-primary-6);
      }

      .even {
        background-color: var(--ant-primary-5);
      }
    `
  ]
})
export class NzDemoFlexBasicComponent {
  public layoutSegment: nzDirection[] = ['row', 'row-reverse', 'column', 'column-reverse'];
  public selectedIndex = 0;
}
