import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

interface Option {
  label: string;
  value: string;
  age: number;
}

@Component({
  selector: 'nz-demo-auto-complete-object-value',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule],
  template: `
    <input placeholder="input here" nz-input [(ngModel)]="inputValue" [nzAutocomplete]="auto" />
    <nz-autocomplete #auto [compareWith]="compareFn">
      @for (option of options; track $index) {
        <nz-auto-option [nzValue]="option" [nzLabel]="option.label">
          {{ option.label }}
        </nz-auto-option>
      }
    </nz-autocomplete>
  `
})
export class NzDemoAutoCompleteObjectValueComponent {
  inputValue: Option = { label: 'Lucy', value: 'lucy', age: 20 };
  readonly options: Option[] = [
    { label: 'Lucy', value: 'lucy', age: 20 },
    { label: 'Jack', value: 'jack', age: 22 }
  ];
  readonly compareFn = (o1: Option | string, o2: Option): boolean => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };
}
