import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-border-less',
  template: `
    <nz-select ngModel="lucy" nzBorderless>
      <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
      <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
    </nz-select>
    <nz-select ngModel="lucy" nzDisabled nzBorderless>
      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
    </nz-select>
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
export class NzDemoSelectBorderLessComponent {}
