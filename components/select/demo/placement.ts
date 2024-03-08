import { Component } from '@angular/core';

import { NzSelectPlacementType } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-placement',
  template: `
    <nz-radio-group [(ngModel)]="placement">
      <label nz-radio-button nzValue="topLeft">topLeft</label>
      <label nz-radio-button nzValue="topRight">topRight</label>
      <label nz-radio-button nzValue="bottomLeft">bottomLeft</label>
      <label nz-radio-button nzValue="bottomRight">bottomRight</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-select [(ngModel)]="selectedValue" [nzDropdownMatchSelectWidth]="false" [nzPlacement]="placement">
      <nz-option nzValue="HangZhou" nzLabel="HangZhou #310000"></nz-option>
      <nz-option nzValue="NingBo" nzLabel="NingBo #315000"></nz-option>
      <nz-option nzValue="WenZhou" nzLabel="WenZhou #325000"></nz-option>
    </nz-select>
  `,
  styles: [
    `
      nz-select {
        width: 120px;
      }
    `
  ]
})
export class NzDemoSelectPlacementComponent {
  placement: NzSelectPlacementType = 'topLeft';
  selectedValue = 'HangZhou';
}
