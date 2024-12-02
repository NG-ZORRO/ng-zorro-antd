import { Component } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';

interface ItemData {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'nz-demo-table-multiple-sorter',
  imports: [NzTableModule],
  template: `
    <nz-table #sortTable [nzData]="listOfData" nzTableLayout="fixed">
      <thead>
        <tr>
          @for (column of listOfColumn; track column) {
            <th [nzSortFn]="column.compare" [nzSortPriority]="column.priority">
              {{ column.title }}
            </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (data of sortTable.data; track data) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.chinese }}</td>
            <td>{{ data.math }}</td>
            <td>{{ data.english }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableMultipleSorterComponent {
  listOfColumn = [
    {
      title: 'Name',
      compare: (a: ItemData, b: ItemData) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Chinese Score',
      compare: (a: ItemData, b: ItemData) => a.chinese - b.chinese,
      priority: 3
    },
    {
      title: 'Math Score',
      compare: (a: ItemData, b: ItemData) => a.math - b.math,
      priority: 2
    },
    {
      title: 'English Score',
      compare: (a: ItemData, b: ItemData) => a.english - b.english,
      priority: 1
    }
  ];
  listOfData: ItemData[] = [
    {
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70
    },
    {
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89
    },
    {
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70
    },
    {
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89
    }
  ];
}
