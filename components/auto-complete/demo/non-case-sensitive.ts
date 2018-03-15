import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-auto-complete-non-case-sensitive',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="example-input">
      <input placeholder="try to type \`b\`" nz-input [(ngModel)]="inputValue" (input)="onInput($event.target?.value)" [nzAutocomplete]="auto">
      <nz-autocomplete [nzDataSource]="filteredOptions" #auto>
      </nz-autocomplete>
    </div>
`
})
export class NzDemoAutoCompleteNonCaseSensitiveComponent {
  inputValue: string;
  filteredOptions = [];
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

  constructor() {
    this.filteredOptions = this.options;
  }

  onInput(value: string): void {
    this.filteredOptions = this.options
    .filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }
}
