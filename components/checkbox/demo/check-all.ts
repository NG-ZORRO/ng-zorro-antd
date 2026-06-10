import { Component, computed, signal } from '@angular/core';
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
      (ngModelChange)="onAllCheckedChange($event)"
      [nzIndeterminate]="indeterminate()"
    >
      Check all
    </label>

    <nz-divider />

    <nz-checkbox-group [nzOptions]="options" [(ngModel)]="value" />
  `
})
export class NzDemoCheckboxCheckAllComponent {
  readonly value = signal<Array<NzCheckboxOption['value']>>(['Apple', 'Orange']);
  readonly options: NzCheckboxOption[] = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];
  readonly allChecked = computed(() => this.value().length === this.options.length);
  readonly indeterminate = computed(() => this.value().length > 0 && !this.allChecked());

  onAllCheckedChange(checked: boolean): void {
    this.value.set(checked ? this.options.map(item => item.value) : []);
  }
}
