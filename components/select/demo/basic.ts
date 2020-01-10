import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-basic',
  template: `
    <div>
      <nz-select [(ngModel)]="selectedValue" nzAllowClear nzPlaceHolder="Choose">
        <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
        <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
        <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
      </nz-select>
      <nz-select [ngModel]="'lucy'" nzDisabled>
        <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
      </nz-select>
      <nz-select [ngModel]="'lucy'" nzLoading>
        <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
      </nz-select>
    </div>
  `,
  styles: [
    `
      nz-select {
        margin-right: 8px;
        width: 120px;
      }
    `
  ]
})
export class NzDemoSelectBasicComponent {
  selectedValue = 'lucy';
}
