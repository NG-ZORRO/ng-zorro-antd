import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-delay-and-debounce',
  template: `
    <nz-spin [nzSpinning]="isSpinning" [nzDelay]="500">
      <nz-alert [nzType]="'info'" [nzMessage]="'Alert message title'" [nzDescription]="'Further details about the context of this alert.'">
      </nz-alert>
    </nz-spin>
    <br />
    <div>
      Loading state：
      <nz-switch [(ngModel)]="isSpinning"></nz-switch>
    </div>
  `
})
export class NzDemoSpinDelayAndDebounceComponent {
  isSpinning = false;
}
