import { Component } from '@angular/core';
export type NzPlacementType = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | '';

@Component({
  selector: 'nz-demo-tree-select-placement',
  template: `
    <nz-space nzDirection="vertical" style="width:100%;">
      <nz-radio-group *nzSpaceItem [(ngModel)]="placement">
        <label *ngFor="let item of list" nz-radio-button [nzValue]="item">{{ item }}</label>
      </nz-radio-group>
      <nz-tree-select
        *nzSpaceItem
        style="width: 120px"
        nzPlaceHolder="Please select"
        [nzPlacement]="placement"
        [(ngModel)]="value"
        [nzMaxTagCount]="3"
        [nzMaxTagPlaceholder]="omittedPlaceHolder"
        [nzNodes]="nodes"
        [nzDropdownStyle]="{ width: '300px' }"
        [nzDefaultExpandAll]="true"
        [nzAllowClear]="false"
        [nzMultiple]="true"
        (ngModelChange)="onChange($event)"
      ></nz-tree-select>
      <ng-template #omittedPlaceHolder let-omittedValues>and {{ omittedValues.length }} more...</ng-template>
    </nz-space>
  `
})
export class NzDemoTreeSelectPlacementComponent {
  list: NzPlacementType[] = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
  placement: NzPlacementType = 'topLeft';
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
