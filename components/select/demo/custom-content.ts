import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-custom-content',
  template: `
    <nz-select nzShowSearch nzAllowClear nzPlaceHolder="Select OS" [(ngModel)]="selectedOS">
      <nz-option nzCustomContent nzLabel="Windows" nzValue="windows">
        <span nz-icon nzType="windows"></span>
        Windows
      </nz-option>
      <nz-option nzCustomContent nzLabel="Mac" nzValue="mac">
        <span nz-icon nzType="apple"></span>
        Mac
      </nz-option>
      <nz-option nzCustomContent nzLabel="Android" nzValue="android">
        <span nz-icon nzType="android"></span>
        Android
      </nz-option>
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
