import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-radiobutton',
  template: `
    <nz-radio-group [(ngModel)]="radioValue">
      <label nz-radio-button nzValue="A">Hangzhou</label>
      <label nz-radio-button nzValue="B">Shanghai</label>
      <label nz-radio-button nzValue="C">Beijing</label>
      <label nz-radio-button nzValue="D">Chengdu</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-radio-group [(ngModel)]="radioValue">
      <label nz-radio-button nzValue="A">Hangzhou</label>
      <label nz-radio-button nzValue="B" nzDisabled>Shanghai</label>
      <label nz-radio-button nzValue="C">Beijing</label>
      <label nz-radio-button nzValue="D">Chengdu</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-radio-group [(ngModel)]="radioValue">
      <label nz-radio-button nzValue="A" nzDisabled>Hangzhou</label>
      <label nz-radio-button nzValue="B" nzDisabled>Shanghai</label>
      <label nz-radio-button nzValue="C" nzDisabled>Beijing</label>
      <label nz-radio-button nzValue="D" nzDisabled>Chengdu</label>
    </nz-radio-group>
  `
})
export class NzDemoRadioRadiobuttonComponent {
  radioValue = 'A';
}
