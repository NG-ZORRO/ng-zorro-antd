import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-tree-select-prefix-and-suffix',
  imports: [FormsModule, NzTreeSelectModule],
  template: `
    <nz-tree-select [nzNodes]="nodes" nzSuffixIcon="smile" [(ngModel)]="value" nzDefaultExpandAll></nz-tree-select>
    <br />
    <br />
    <nz-tree-select [nzNodes]="nodes" nzPrefix="Prefix" [(ngModel)]="value" nzDefaultExpandAll></nz-tree-select>
  `,
  styles: `
    nz-tree-select {
      width: 100%;
    }
  `
})
export class NzDemoTreeSelectPrefixAndSuffixComponent {
  readonly value = model();
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
}
