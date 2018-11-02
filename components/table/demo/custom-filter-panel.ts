import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-custom-filter-panel',
  template: `
    <nz-table #nzTable [nzData]="displayData">
      <thead>
        <tr>
          <th nzCustomFilter>
            Name
            <nz-dropdown nzTrigger="click" [nzClickHide]="false" #dropdown>
              <i nz-icon type="smile-o" class="ant-table-filter-icon" [class.ant-table-filter-open]="dropdown.nzVisible" nz-dropdown></i>
              <div class="custom-filter-dropdown">
                <input type="text" nz-input placeholder="Search name" [(ngModel)]="searchValue">
                <button nz-button [nzType]="'primary'" (click)="search()">Search</button>
              </div>
            </nz-dropdown>
          </th>
          <th>Age</th>
          <th nzShowFilter [nzFilters]="filterAddressArray" (nzFilterChange)="filterAddressChange($event)">Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of nzTable.data">
          <td>{{data.name}}</td>
          <td>{{data.age}}</td>
          <td>{{data.address}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : [
      `
      .custom-filter-dropdown {
        padding: 8px;
        border-radius: 6px;
        background: #fff;
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
      }

      [nz-input] {
        width: 130px;
        margin-right: 8px;
      }

      .highlight {
        color: #f50;
      }
    `
  ]
})
export class NzDemoTableCustomFilterPanelComponent {
  searchValue = '';
  filterAddressArray = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' }
  ];
  searchAddress = [];
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
  displayData = [ ...this.data ];

  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.search();
  }

  filterAddressChange(value: string[]): void {
    this.searchAddress = value;
    this.search();
  }

  search(): void {
    const filterFunc = (item) => {
      return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
        (item.name.indexOf(this.searchValue) !== -1);
    };
    const data = this.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }
}
