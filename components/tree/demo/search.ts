import { Component } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-demo-tree-search',
  template: `
    <nz-row>
      <nz-input-group [nzSuffix]="suffixIcon">
        <input type="text" nz-input placeholder="Search" [(ngModel)]="searchValue" />
      </nz-input-group>
      <label nz-checkbox [(ngModel)]="ifCaseSensitive">Case Sensitive</label>
    </nz-row>
    <ng-template #suffixIcon>
      <i nz-icon nzType="search"></i>
    </ng-template>
    <nz-tree
      [nzData]="nodes"
      [nzHideUnMatched]="true"
      [nzSearchValue]="searchValue"
      [nzFilterOption]="customFilterOption"
      (nzClick)="nzEvent($event)"
      (nzExpandChange)="nzEvent($event)"
      y
      (nzSearchValueChange)="nzEvent($event)"
    >
    </nz-tree>
  `,
  styles: [
    `
      nz-input-group {
        padding: 10px 0;
      }
    `
  ]
})
export class NzDemoTreeSearchComponent {
  searchValue = '';
  ifCaseSensitive = true;
  nodes = [
    {
      title: 'A',
      key: 'A',
      children: [
        {
          title: 'A-a',
          key: 'A-a',
          children: [
            { title: 'A-a-a', key: 'A-a-a', isLeaf: true },
            { title: 'A-a-b', key: 'A-a-b', isLeaf: true },
            { title: 'A-a-c', key: 'A-a-c', isLeaf: true }
          ]
        },
        {
          title: 'A-b',
          key: 'A-b',
          children: [
            { title: 'A-b-a', key: 'A-b-a', isLeaf: true },
            { title: 'A-b-b', key: 'A-b-b', isLeaf: true },
            { title: 'A-b-c', key: 'A-b-c', isLeaf: true }
          ]
        },
        {
          title: 'A-c',
          key: 'A-c',
          isLeaf: true
        }
      ]
    },
    {
      title: 'B',
      key: 'B',
      children: [
        { title: 'B-a', key: 'B-a', isLeaf: true },
        { title: 'B-b', key: 'B-b', isLeaf: true },
        { title: 'B-c', key: 'B-c', isLeaf: true }
      ]
    },
    {
      title: 'C',
      key: 'C',
      isLeaf: true
    }
  ];

  customFilterOption = (inputValue: string, option: NzTreeNode) => {
    console.log(inputValue, option);
    if (this.ifCaseSensitive) {
      return option.title.indexOf(inputValue) > -1;
    } else {
      return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
    }
  };

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
}
