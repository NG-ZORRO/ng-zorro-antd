import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-basic',
  template: `
    <div>
      <nz-select style="width: 120px;" [(ngModel)]="selectedValue" nzAllowClear nzPlaceholder="Choose">
        <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
        <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
        <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
      </nz-select>
      <nz-select style="width: 120px;" [ngModel]="'lucy'" nzDisabled>
        <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
      </nz-select>
    </div>
  `
})
export class NzDemoSelectBasicComponent {
  selectedValue = 'lucy';
}
