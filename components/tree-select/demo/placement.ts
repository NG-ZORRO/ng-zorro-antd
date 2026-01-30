import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTreeSelectModule, NzPlacementType } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-tree-select-placement',
  imports: [FormsModule, NzRadioModule, NzTreeSelectModule],
  template: `
    <nz-radio-group [(ngModel)]="placement">
      @for (item of list; track item) {
        <label nz-radio-button [nzValue]="item">{{ item }}</label>
      }
    </nz-radio-group>
    <br />
    <br />
    <nz-tree-select
      nzPlaceHolder="Please select"
      [nzPlacement]="placement"
      [(ngModel)]="value"
      [nzNodes]="nodes"
      [nzDropdownStyle]="{ width: '300px' }"
      nzDefaultExpandAll
      (ngModelChange)="onChange($event)"
    />
  `
})
export class NzDemoTreeSelectPlacementComponent {
  list: NzPlacementType[] = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
  placement: NzPlacementType = 'topLeft';
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
