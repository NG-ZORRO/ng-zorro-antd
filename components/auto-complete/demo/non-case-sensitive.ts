import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-non-case-sensitive',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <input
        placeholder='try to type "b"'
        nz-input
        [(ngModel)]="inputValue"
        (ngModelChange)="onChange($event)"
        [nzAutocomplete]="auto"
      />
      <nz-autocomplete [nzDataSource]="filteredOptions" #auto></nz-autocomplete>
    </div>
  `
})
export class NzDemoAutoCompleteNonCaseSensitiveComponent {
  inputValue?: string;
  filteredOptions: string[] = [];
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  constructor() {
    this.filteredOptions = this.options;
  }
  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}
