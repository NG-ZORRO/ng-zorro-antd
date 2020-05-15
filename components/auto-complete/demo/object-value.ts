import { Component, ViewEncapsulation } from '@angular/core';

interface Option {
  label: string;
  value: string;
  age: number;
}

@Component({
  selector: 'nz-demo-auto-complete-object-value',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <input placeholder="input here" nz-input [(ngModel)]="inputValue" [nzAutocomplete]="auto" />
      <nz-autocomplete #auto [compareWith]="compareFun">
        <nz-auto-option *ngFor="let option of options" [nzValue]="option" [nzLabel]="option.label">
          {{ option.label }}
        </nz-auto-option>
      </nz-autocomplete>
    </div>
  `
})
export class NzDemoAutoCompleteObjectValueComponent {
  inputValue: Option = { label: 'Lucy', value: 'lucy', age: 20 };
  options: Option[] = [
    { label: 'Lucy', value: 'lucy', age: 20 },
    { label: 'Jack', value: 'jack', age: 22 }
  ];

  compareFun = (o1: Option | string, o2: Option) => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };
}
