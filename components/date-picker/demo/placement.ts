import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-placement',
  template: `
    <nz-radio-group [(ngModel)]="placement">
      <label nz-radio-button nzValue="bottomLeft">bottomLeft</label>
      <label nz-radio-button nzValue="bottomRight">bottomRight</label>
      <label nz-radio-button nzValue="topLeft">topLeft</label>
      <label nz-radio-button nzValue="topRight">topRight</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-date-picker [nzPlacement]="placement"></nz-date-picker>
    <br />
    <nz-range-picker [nzPlacement]="placement"></nz-range-picker>
  `,
  styles: [
    `
      nz-date-picker,
      nz-range-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerPlacementComponent {
  placement: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' = 'bottomLeft';
}
