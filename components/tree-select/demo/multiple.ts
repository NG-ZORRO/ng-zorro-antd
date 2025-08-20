import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-tree-select-multiple',
  imports: [FormsModule, NzTreeSelectModule],
  template: `
    <nz-tree-select
      style="width: 250px"
      nzPlaceHolder="Please select"
      [(ngModel)]="value"
      [nzMaxTagCount]="3"
      [nzMaxTagPlaceholder]="omittedPlaceHolder"
      [nzNodes]="nodes"
      nzDefaultExpandAll
      nzMultiple
      (ngModelChange)="onChange($event)"
    ></nz-tree-select>
    <ng-template #omittedPlaceHolder let-omittedValues>and {{ omittedValues.length }} more...</ng-template>
  `
})
export class NzDemoTreeSelectMultipleComponent {
  value: string[] = [];
  readonly nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];

  onChange($event: string[]): void {
    console.log($event);
  }
}
