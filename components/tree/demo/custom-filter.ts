import { Component, ViewChild } from '@angular/core';
import { NzTreeComponent } from 'ng-zorro-antd';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-demo-tree-custom-filter',
  template: `
    <nz-input-group [nzSuffix]="suffixIcon">
      <input type="text" nz-input placeholder="Search (Case Insensitive)" [(ngModel)]="searchValue" />
    </nz-input-group>
    <ng-template #suffixIcon>
      <i nz-icon nzType="search"></i>
    </ng-template>
    <nz-tree
      #treeComponent
      [nzData]="nodes"
      [nzSearchValue]="searchValue"
      [nzFilterOption]="customFilterOption"
      [nzHighlightFunc]="customHighlightFunc"
      (nzSearchValueChange)="nzEvent($event)"
    >
    </nz-tree>
  `,
  styles: [
    `
      nz-input-group {
        padding: 10px 0;
      }

      ::ng-deep .highlight-font {
        color: #f5222d;
      }
    `
  ]
})
export class NzDemoTreeCustomFilterComponent {
  @ViewChild('treeComponent', { static: true }) treeComponent: NzTreeComponent;
  searchValue = '';
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
    return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  };

  customHighlightFunc = (inputValue: string, option: NzTreeNode) => {
    if (inputValue && option) {
      const startIndex = option.title.toLowerCase().indexOf(inputValue.toLowerCase());
      if (startIndex > -1) {
        const highlightLength = inputValue.length;
        const highlightText = option.title.slice(startIndex, startIndex + highlightLength);
        return option.title.replace(highlightText, `<span class="highlight-font">${highlightText}</span>`);
      } else {
        return option.title;
      }
    } else {
      return option.title;
    }
  };

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
}
