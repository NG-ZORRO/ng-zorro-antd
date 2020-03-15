import { Component } from '@angular/core';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'nz-demo-table-sort-filter',
  template: `
    <nz-table #filterTable [nzData]="listOfData" nzTableLayout="fixed">
      <thead>
        <tr>
          <th [nzFilterFn]="nameFilterFn" [nzSortFn]="sortNameFn" [nzFilters]="listOfName">
            Name
          </th>
          <th [nzSortOrder]="'descend'" [nzSortFn]="sortAgeFn" [nzSortDirections]="['descend', null]">Age</th>
          <th [nzSortFn]="sortAddressLengthFn" [nzFilterFn]="addressFilterFn" [nzFilterMultiple]="false" [nzFilters]="listOfAddress">
            Address
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of filterTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableSortFilterComponent {
  sortNameFn = (a: DataItem, b: DataItem) => a.name.localeCompare(b.name);
  sortAgeFn = (a: DataItem, b: DataItem) => a.age - b.age;
  sortAddressLengthFn = (a: DataItem, b: DataItem) => a.address.length - b.address.length;
  nameFilterFn = (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1);
  addressFilterFn = (address: string, item: DataItem) => item.address.indexOf(address) !== -1;
  listOfName = [
    { text: 'Joe', value: 'Joe' },
    { text: 'Jim', value: 'Jim', byDefault: true }
  ];
  listOfAddress = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' }
  ];
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];

  constructor() {}
}
