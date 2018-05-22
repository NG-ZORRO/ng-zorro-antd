import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-search',
  template: `
    <nz-select style="width: 200px;" nzShowSearch nzAllowClear nzPlaceHolder="Select a person" [(ngModel)]="selectedValue">
      <nz-option nzLabel="Jack" nzValue="jack"></nz-option>
      <nz-option nzLabel="Lucy" nzValue="lucy"></nz-option>
      <nz-option nzLabel="Tom" nzValue="tom"></nz-option>
    </nz-select>
  `
})
export class NzDemoSelectSearchComponent {
  selectedValue;
}
