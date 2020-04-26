import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-options',
  template: `
    <nz-select ngModel="lucy" [nzOptions]="listOfOption"></nz-select>
    <nz-select [(ngModel)]="selectedValue" nzAllowClear nzPlaceHolder="Choose" [nzOptions]="listOfGroupOption"></nz-select>
  `,
  styles: [
    `
      nz-select {
        margin: 0 8px 10px 0;
        width: 120px;
      }
    `
  ]
})
export class NzDemoSelectOptionsComponent {
  selectedValue = 'lucy';
  listOfOption = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'disabled', value: 'disabled', disabled: true }
  ];
  listOfGroupOption = [
    { label: 'Jack', value: 'jack', groupLabel: 'Manager' },
    { label: 'Lucy', value: 'lucy', groupLabel: 'Manager' },
    { label: 'Tom', value: 'tom', groupLabel: 'Engineer' }
  ];
}
