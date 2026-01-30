import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule, NzCheckboxOption } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'nz-demo-checkbox-check-all',
  imports: [FormsModule, NzCheckboxModule, NzDividerModule],
  template: `
    <label
      nz-checkbox
      [(ngModel)]="allChecked"
      (ngModelChange)="updateAllChecked()"
      [nzIndeterminate]="value.length > 0 && value.length !== options.length"
    >
      Check all
    </label>

    <nz-divider />

    <nz-checkbox-group [nzOptions]="options" [(ngModel)]="value" (ngModelChange)="updateSingleChecked()" />
  `
})
export class NzDemoCheckboxCheckAllComponent {
  isAllCheckedFirstChange = true;
  allChecked = false;
  value: Array<string | number> = ['Apple', 'Orange'];
  options: NzCheckboxOption[] = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];

  updateAllChecked(): void {
    if (!this.isAllCheckedFirstChange) {
      this.value = this.allChecked ? this.options.map(item => item.value) : [];
    }
    this.isAllCheckedFirstChange = false;
  }

  updateSingleChecked(): void {
    this.allChecked = this.value.length === this.options.length;
  }
}
