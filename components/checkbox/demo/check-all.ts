import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule, NzCheckboxOption } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'nz-demo-checkbox-check-all',
  imports: [FormsModule, NzCheckboxModule, NzDividerModule],
  template: `
    <label
      nz-checkbox
      [ngModel]="allChecked()"
      (ngModelChange)="allChecked.set($event); updateAllChecked()"
      [nzIndeterminate]="value().length > 0 && value().length !== options.length"
    >
      Check all
    </label>

    <nz-divider />

    <nz-checkbox-group
      [nzOptions]="options"
      [ngModel]="value()"
      (ngModelChange)="value.set($event); updateSingleChecked()"
    />
  `
})
export class NzDemoCheckboxCheckAllComponent {
  isAllCheckedFirstChange = true;
  readonly allChecked = signal(false);
  readonly value = signal<Array<string | number>>(['Apple', 'Orange']);
  readonly options: NzCheckboxOption[] = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];

  updateAllChecked(): void {
    if (!this.isAllCheckedFirstChange) {
      this.value.set(this.allChecked() ? this.options.map(item => item.value) : []);
    }
    this.isAllCheckedFirstChange = false;
  }

  updateSingleChecked(): void {
    this.allChecked.set(this.value().length === this.options.length);
  }
}
