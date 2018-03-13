import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-optgroup',
  template: `
    <nz-select style="width: 120px;" [(ngModel)]="selectedValue" nzAllowClear nzPlaceHolder="Choose">
      <nz-option-group nzLabel="Manager">
        <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
        <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
      </nz-option-group>
      <nz-option-group nzLabel="Engineer">
        <nz-option nzValue="Tom" nzLabel="tom"></nz-option>
      </nz-option-group>
    </nz-select>
  `
})
export class NzDemoSelectOptgroupComponent {
  selectedValue = 'lucy';
}
