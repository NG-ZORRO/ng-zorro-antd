import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-delayAndDebounce',
  template: `
    <nz-spin [nzSpinning]="isSpinning" [nzDelay]="500">
      <nz-alert
        [nzType]="'info'"
        [nzMessage]="'Alert message title'"
        [nzDescription]="'Further details about the context of this alert.'"
      >
      </nz-alert>
    </nz-spin>
    <div style="margin-top:8px;">
      Loading state：
      <nz-switch [(ngModel)]="isSpinning"></nz-switch>
    </div>
  `
})
export class NzDemoSpinDelayAndDebounceComponent {
  isSpinning = false;
}
