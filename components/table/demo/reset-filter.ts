import { Component } from '@angular/core';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface OptionItem {
  byDefault?: boolean;
  text: string;
  value: string;
}

@Component({
  selector: 'nz-demo-table-reset-filter',
  template: `
    <div class="table-operations">
      <button nz-button (click)="sortByAge()">Sort age</button>
      <button nz-button (click)="resetFilters()">Clear filters</button>
      <button nz-button (click)="resetSortAndFilters()">Clear filters and sorters</button>
    </div>
    <nz-table #filterTable [nzData]="listOfData" nzTableLayout="fixed">
      <thead>
        <tr>
          <th [(nzSortOrder)]="nameSortOrder" [nzSortFn]="sortNameFn" [nzFilters]="listOfFilterName" [nzFilterFn]="nameFilterFn">
            Name
          </th>
          <th [(nzSortOrder)]="ageSortOrder" [nzSortFn]="sortAgeFn">Age</th>
          <th
            [(nzSortOrder)]="addressSortOrder"
            [nzSortFn]="sortAddressLengthFn"
            [nzFilters]="listOfFilterAddress"
            [nzFilterFn]="addressFilterFn"
          >
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
  `,
  styles: [
    `
      .table-operations {
        margin-bottom: 16px;
      }

      .table-operations > button {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoTableResetFilterComponent {
  sortNameFn = (a: DataItem, b: DataItem) => a.name.localeCompare(b.name);
  sortAgeFn = (a: DataItem, b: DataItem) => a.age - b.age;
  sortAddressLengthFn = (a: DataItem, b: DataItem) => a.address.length - b.address.length;
  nameFilterFn = (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1);
  addressFilterFn = (address: string, item: DataItem) => item.address.indexOf(address) !== -1;
  nameSortOrder: string | null = null;
  ageSortOrder: string | null = null;
  addressSortOrder: string | null = null;
  listOfFilterName: OptionItem[] = [
    { text: 'Joe', value: 'Joe' },
    { text: 'Jim', value: 'Jim' }
  ];
  listOfFilterAddress: OptionItem[] = [
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

  sortByAge(): void {
    this.nameSortOrder = null;
    this.ageSortOrder = 'descend';
    this.addressSortOrder = null;
  }

  resetFilters(): void {
    this.listOfFilterName = [
      { text: 'Joe', value: 'Joe' },
      { text: 'Jim', value: 'Jim' }
    ];
    this.listOfFilterAddress = [
      { text: 'London', value: 'London' },
      { text: 'Sidney', value: 'Sidney' }
    ];
  }

  resetSortAndFilters(): void {
    this.nameSortOrder = null;
    this.ageSortOrder = null;
    this.addressSortOrder = null;
    this.resetFilters();
  }
}
