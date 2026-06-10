import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormatEmitEvent, NzTreeModule } from 'ng-zorro-antd/tree';

@Component({
  selector: 'nz-demo-tree-search',
  imports: [FormsModule, NzInputModule, NzTreeModule],
  template: `
    <nz-input-search>
      <input type="text" nz-input placeholder="Search" [(ngModel)]="searchValue" />
    </nz-input-search>
    <br />
    <nz-tree
      [nzData]="nodes"
      [nzSearchValue]="searchValue()"
      (nzClick)="log($event)"
      (nzExpandChange)="log($event)"
      (nzSearchValueChange)="log($event)"
    />
  `
})
export class NzDemoTreeSearchComponent {
  readonly searchValue = signal('');

  readonly nodes = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];

  log(event: NzFormatEmitEvent): void {
    console.log(event);
  }
}
