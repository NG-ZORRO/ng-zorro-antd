import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-optgroup',
  template: `
    <nz-select [(ngModel)]="selectedValue" nzAllowClear nzPlaceHolder="Choose">
      <nz-option-group nzLabel="Manager">
        <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
        <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
      </nz-option-group>
      <nz-option-group nzLabel="Engineer">
        <nz-option nzValue="tom" nzLabel="Tom"></nz-option>
      </nz-option-group>
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
export class NzDemoSelectOptgroupComponent {
  selectedValue = 'lucy';
}
