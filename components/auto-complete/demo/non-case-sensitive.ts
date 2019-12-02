import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-auto-complete-non-case-sensitive',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <input placeholder="try to type \`b\`" nz-input [(ngModel)]="inputValue" (ngModelChange)="onChange($event)" [nzAutocomplete]="auto" />
      <nz-autocomplete [nzDataSource]="filteredOptions" #auto></nz-autocomplete>
    </div>
  `
})
export class NzDemoAutoCompleteNonCaseSensitiveComponent {
  inputValue: string;
  filteredOptions: string[] = [];
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

  constructor() {
    this.filteredOptions = this.options;
  }

  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}
