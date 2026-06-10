import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'nz-demo-select-label-in-value',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select [(ngModel)]="value" [compareWith]="compareFn" nzAllowClear nzPlaceHolder="Choose">
      @for (option of options; track option) {
        <nz-option [nzValue]="option" [nzLabel]="option.label" />
      }
      <nz-select />
    </nz-select>
  `,
  styles: `
    nz-select {
      width: 120px;
    }
  `
})
export class NzDemoSelectLabelInValueComponent {
  readonly options: Option[] = [
    { label: 'Lucy (101)', value: 'lucy' },
    { label: 'Jack (100)', value: 'jack' }
  ];
  readonly compareFn = (o1: Option, o2: Option): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);
  readonly value = signal({ label: 'Jack (100)', value: 'jack' });
}
