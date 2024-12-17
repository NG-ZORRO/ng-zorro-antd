import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

const getOptions = (): NzCascaderOption[] => [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20).fill(null).map((_, index) => ({ label: `Number ${index}`, value: index, isLeaf: true }))
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
            isLeaf: true,
            disableCheckbox: true
          },
          {
            label: 'Toy Cards',
            value: 'cards',
            isLeaf: true
          },
          {
            label: 'Toy Bird',
            value: 'bird',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'nz-demo-cascader-multiple',
  imports: [FormsModule, NzCascaderModule],
  template: `
    <nz-cascader
      style="width: 100%;"
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)"
      nzMultiple
      [nzMaxTagCount]="3"
    ></nz-cascader>
  `
})
export class NzDemoCascaderMultipleComponent {
  nzOptions: NzCascaderOption[] = getOptions();
  values: NzSafeAny[][] | null = null;

  onChanges(values: NzSafeAny[][]): void {
    console.log(values, this.values);
  }
}
