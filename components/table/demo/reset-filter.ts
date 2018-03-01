import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-reset-filter',
  template: `
    <div class="table-operations">
      <button nz-button (click)="sort('age','descend')">Sort age</button>
      <button nz-button (click)="resetFilters()">Clear filters</button>
      <button nz-button (click)="resetSortAndFilters()">Clear filters and sorters</button>
    </div>
    <nz-table #filterTable [nzDataSource]="data">
      <thead>
        <tr>
          <th
            [(nzSort)]="sortMap.name"
            (nzSortChange)="sort('name',$event)"
            [nzFilters]="filterNameList"
            (nzOnFilter)="search($event)">
            Name
          </th>
          <th [(nzSort)]="sortMap.age" (nzSortChange)="sort('age',$event)">Age</th>
          <th
            [(nzSort)]="sortMap.address"
            (nzSortChange)="sort('address',$event)"
            [nzFilters]="filterAddressList"
            (nzOnFilter)="search(null,$event)">
            Address
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of filterTable.data">
          <td>{{data.name}}</td>
          <td>{{data.age}}</td>
          <td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : [
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
  searchName = [];
  searchAddress = [];
  filterNameList = [
    { text: 'Joe', value: 'Joe' },
    { text: 'Jim', value: 'Jim' }
  ];
  filterAddressList = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' }
  ];
  sortMap = {
    name   : null,
    age    : null,
    address: null
  };
  sortName = null;
  sortValue = null;

  data = [
    {
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name   : 'Jim Red',
      age    : 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  copyData = [ ...this.data ];

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.search();
  }

  search(searchName?: string[], searchAddress?: string[]): void {
    if (searchName) {
      this.searchName = searchName;
    }
    if (searchAddress) {
      this.searchAddress = searchAddress;
    }
    const filterFunc = item => (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) && (this.searchName.length ? this.searchName.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.copyData.filter(item => filterFunc(item));
    if (this.sortName) {
      this.data = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] - b[ this.sortName ]) : (b[ this.sortName ] - a[ this.sortName ]));
    } else {
      this.data = data;
    }
  }

  resetFilters(): void {
    this.filterNameList = [
      { text: 'Joe', value: 'Joe' },
      { text: 'Jim', value: 'Jim' }
    ];
    this.filterAddressList = [
      { text: 'London', value: 'London' },
      { text: 'Sidney', value: 'Sidney' }
    ];
    this.searchName = [];
    this.searchAddress = [];
    this.search();
  }

  resetSortAndFilters(): void {
    this.sortName = null;
    this.sortValue = null;
    this.sortMap = {
      name   : null,
      age    : null,
      address: null
    };
    this.resetFilters();
    this.search();
  }
}
