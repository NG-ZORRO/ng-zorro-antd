import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-flex-basic',
  template: `
    <nz-radio-group [(ngModel)]="isVertical">
      <label nz-radio [nzValue]="false">horizontal</label>
      <label nz-radio [nzValue]="true">vertical</label>
    </nz-radio-group>

    <div nz-flex [nzVertical]="isVertical">
      <div class="flex-item"></div>
      <div class="flex-item even"></div>
      <div class="flex-item"></div>
      <div class="flex-item even"></div>
    </div>
  `,

  styles: [
    `
      nz-radio-group {
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
  isVertical = false;
}
