import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-auto-complete-basic',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="example-input">
      <input nz-input [(ngModel)]="inputValue" (ngModelChange)="onChange($event)" [nzAutocomplete]="auto">
      <nz-autocomplete [nzDataSource]="options" nzBackfill #auto>
      </nz-autocomplete>
    </div>
`
})
export class NzDemoAutoCompleteBasicComponent {
  inputValue: string;
  options = [];

  onChange(value: string): void {
    this.options = value ? [
      value,
      value + value,
      value + value + value
    ] : [];
  }
}
