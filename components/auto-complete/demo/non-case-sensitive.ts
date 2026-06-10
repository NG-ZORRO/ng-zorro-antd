import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-non-case-sensitive',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule],
  template: `
    <input placeholder='try to type "b"' nz-input [(ngModel)]="value" [nzAutocomplete]="auto" />
    <nz-autocomplete [nzDataSource]="filteredOptions()" #auto />
  `
})
export class NzDemoAutoCompleteNonCaseSensitiveComponent {
  readonly value = signal<string>('');
  readonly options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  readonly filteredOptions = computed(() =>
    this.options.filter(option => option.toLowerCase().indexOf(this.value().toLowerCase()) !== -1)
  );
}
