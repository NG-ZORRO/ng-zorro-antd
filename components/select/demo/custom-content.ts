import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-custom-content',
  standalone: true,
  imports: [FormsModule, NzIconModule, NzSelectModule],
  template: `
    <nz-select nzShowSearch nzAllowClear nzPlaceHolder="Select OS" [(ngModel)]="selectedValue">
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
  selectedValue = null;
}
