import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-reset-filter',
  template: `
    <div class="table-operations">
      <button nz-button (click)="sort('age','descend')">Sort age</button>
      <button nz-button (click)="reset(filterNameArray);reset(filterAddressArray);">Clear filters</button>
      <button nz-button (click)="sort(null,null);reset(filterNameArray);reset(filterAddressArray);">Clear filters and sorters</button>
    </div>
    <nz-table #nzTable [nzDataSource]="data" [nzPageSize]="10">
      <thead nz-thead>
        <tr>
          <th nz-th>
            <span>Name</span>
            <nz-table-sort [(nzValue)]="sortMap.name" (nzValueChange)="sort('name',$event)"></nz-table-sort>
            <nz-dropdown [nzTrigger]="'click'">
              <i class="anticon anticon-filter" nz-dropdown></i>
              <ul nz-menu>
                <li nz-menu-item *ngFor="let filter of filterNameArray">
                  <label nz-checkbox [(ngModel)]="filter.value">
                    <span>{{filter.name}}</span>
                  </label>
                </li>
              </ul>
              <div nz-table-filter>
                <span nz-table-filter-confirm (click)="search()">OK</span>
                <span nz-table-filter-clear (click)="reset(filterNameArray)">Reset</span>
              </div>
            </nz-dropdown>
          </th>
          <th nz-th>
            <span>Age</span>
            <nz-table-sort [(nzValue)]="sortMap.age" (nzValueChange)="sort('age',$event)"></nz-table-sort>
          </th>
          <th nz-th>
            <span>Address</span>
            <nz-table-sort [(nzValue)]="sortMap.address" (nzValueChange)="sort('address',$event)"></nz-table-sort>
            <nz-dropdown [nzTrigger]="'click'">
              <i class="anticon anticon-filter" nz-dropdown></i>
              <ul nz-menu>
                <li nz-menu-item *ngFor="let filter of filterAddressArray">
                  <label nz-checkbox [(ngModel)]="filter.value">
                    <span>{{filter.name}}</span>
                  </label>
                </li>
              </ul>
              <div nz-table-filter>
                <span nz-table-filter-confirm (click)="search()">OK</span>
                <span nz-table-filter-clear (click)="reset(filterAddressArray)">Reset</span>
              </div>
            </nz-dropdown>
          </th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of nzTable.data">
          <td nz-td>
            <a>{{data.name}}</a>
          </td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
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
  filterNameArray = [
    { name: 'Joe', value: false },
    { name: 'Jim', value: false },
  ];
  filterAddressArray = [
    { name: 'London', value: false },
    { name: 'Sidney', value: false }
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
      address: 'New York No. 1 Lake Park',
    }, {
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park',
    }, {
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park',
    }, {
      name   : 'Jim Red',
      age    : 32,
      address: 'London No. 2 Lake Park',
    }
  ];
  copyData = [ ...this.data ];

  sort(sortName, value) {
    this.sortName = sortName;
    this.sortValue = value;
    Object.keys(this.sortMap).forEach(key => {
      if (key !== sortName) {
        this.sortMap[ key ] = null;
      } else {
        this.sortMap[ key ] = value;
      }
    });
    this.search();
  }

  search() {
    const searchAddress = this.filterAddressArray.filter(address => address.value);
    const searchName = this.filterNameArray.filter(name => name.value);
    const filterFunc = (item) => {
      return (searchAddress.length ? searchAddress.some(address => item.address.indexOf(address.name) !== -1) : true) &&
        (searchName.length ? searchName.some(name => item.name.indexOf(name.name) !== -1) : true)
    };
    this.data = [ ...this.copyData.filter(item => filterFunc(item)) ];
    this.data = [ ...this.data.sort((a, b) => {
      if (a[ this.sortName ] > b[ this.sortName ]) {
        return (this.sortValue === 'ascend') ? 1 : -1;
      } else if (a[ this.sortName ] < b[ this.sortName ]) {
        return (this.sortValue === 'ascend') ? -1 : 1;
      } else {
        return 0;
      }
    }) ];
  }

  reset(array) {
    array.forEach(item => {
      item.value = false;
    });
    this.search();
  }
}

