import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

interface Option {
  label: string;
  value: string;
  age: number;
}

@Component({
  selector: 'nz-demo-select-label-in-value',
  imports: [FormsModule, NzSelectModule],
  template: `
    <p>The selected option's age is {{ selectedValue?.age }}</p>
    <br />
    <nz-select
      [(ngModel)]="selectedValue"
      [compareWith]="compareFn"
      (ngModelChange)="log($event)"
      nzAllowClear
      nzPlaceHolder="Choose"
    >
      @for (option of optionList; track option) {
        <nz-option [nzValue]="option" [nzLabel]="option.label" />
      }
    </nz-select>
  `,
  styles: `
    nz-select {
      width: 120px;
    }
  `
})
export class NzDemoSelectLabelInValueComponent {
  optionList: Option[] = [
    { label: 'Lucy', value: 'lucy', age: 20 },
    { label: 'Jack', value: 'jack', age: 22 }
  ];
  selectedValue: Option = { label: 'Jack', value: 'jack', age: 22 };
  readonly compareFn = (o1: Option, o2: Option): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  log(value: Option): void {
    console.log(value);
  }
}
