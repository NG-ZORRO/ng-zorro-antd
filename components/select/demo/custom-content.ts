import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-custom-content',
  template: `
    <nz-select nzShowSearch nzAllowClear nzPlaceHolder="Select OS" [(ngModel)]="selectedOS">
      <nz-option nzCustomContent nzLabel="Windows" nzValue="windows"><i nz-icon nzType="windows"></i> Windows</nz-option>
      <nz-option nzCustomContent nzLabel="Mac" nzValue="mac"><i nz-icon nzType="apple"></i> Mac</nz-option>
      <nz-option nzCustomContent nzLabel="Android" nzValue="android"><i nz-icon nzType="android"></i> Android </nz-option>
    </nz-select>
  `,
  styles: [
    `
      nz-select {
        width: 200px;
      }
    `
  ]
})
export class NzDemoSelectCustomContentComponent {
  selectedOS = null;
}
