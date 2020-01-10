import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tree-select-multiple',
  template: `
    <nz-tree-select
      style="width: 250px"
      nzPlaceHolder="Please select"
      [(ngModel)]="value"
      [nzMaxTagCount]="3"
      [nzMaxTagPlaceholder]="omittedPlaceHolder"
      [nzNodes]="nodes"
      [nzDefaultExpandAll]="true"
      [nzAllowClear]="false"
      [nzMultiple]="true"
      (ngModelChange)="onChange($event)"
    >
    </nz-tree-select>
    <ng-template #omittedPlaceHolder let-omittedValues> and {{ omittedValues.length }} more... </ng-template>
  `
})
export class NzDemoTreeSelectMultipleComponent {
  value: string[] = [];
  nodes = [
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
