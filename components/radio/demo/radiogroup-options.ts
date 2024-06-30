import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-radiogroup-options',
  template: `
    <nz-radio-group [(ngModel)]="radioValue">
      @for (o of options; track o.value) {
        <label nz-radio [nzValue]="o.value">{{ o.label }}</label>
      }
    </nz-radio-group>
    <nz-radio-group [(ngModel)]="radioValue">
      @for (o of options; track o.value) {
        <label nz-radio [nzValue]="o.value">{{ o.label }}</label>
      }
    </nz-radio-group>
    <nz-radio-group [(ngModel)]="radioValue">
      @for (o of options; track o.value) {
        <label nz-radio [nzValue]="o.value">{{ o.label }}</label>
      }
    </nz-radio-group>
  `
})
export class NzDemoRadioRadiogroupOptionsComponent {
  radioValue = 'Apple';
  options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];
}
