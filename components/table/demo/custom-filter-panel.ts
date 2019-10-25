import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-custom-filter-panel',
  template: `
    <nz-table #nzTable [nzData]="listOfDisplayData">
      <thead>
        <tr>
          <th nzCustomFilter>
            Name
            <i
              nz-th-extra
              class="ant-table-filter-icon"
              nz-icon
              nz-dropdown
              #dropdown="nzDropdown"
              nzType="search"
              [nzDropdownMenu]="menu"
              [class.ant-table-filter-open]="dropdown.nzVisible"
              nzTrigger="click"
              nzPlacement="bottomRight"
              [nzClickHide]="false"
              nzTableFilter
            ></i>
          </th>
          <th>Age</th>
          <th nzShowFilter [nzFilters]="listOfFilterAddress" (nzFilterChange)="filterAddressChange($event)">Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of nzTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </nz-table>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <div class="search-box">
        <input type="text" nz-input placeholder="Search name" [(ngModel)]="searchValue" />
        <button nz-button nzSize="small" nzType="primary" (click)="search()" class="search-button">
          Search
        </button>
        <button nz-button nzSize="small" (click)="reset()">Reset</button>
      </div>
    </nz-dropdown-menu>
  `,
  styles: [
    `
      .search-box {
        padding: 8px;
      }

      .search-box input {
        width: 188px;
        margin-bottom: 8px;
        display: block;
      }

      .search-box button {
        width: 90px;
      }

      .search-button {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoTableCustomFilterPanelComponent {
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfFilterAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
  listOfSearchAddress: string[] = [];
  listOfData: Array<{ name: string; age: number; address: string; [key: string]: string | number }> = [
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
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    this.search();
  }

  filterAddressChange(value: string[]): void {
    this.listOfSearchAddress = value;
    this.search();
  }

  search(): void {
    const filterFunc = (item: { name: string; age: number; address: string }) => {
      return (
        (this.listOfSearchAddress.length
          ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
          : true) && item.name.indexOf(this.searchValue) !== -1
      );
    };
    const data = this.listOfData.filter((item: { name: string; age: number; address: string }) => filterFunc(item));
    this.listOfDisplayData = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
        : b[this.sortName!] > a[this.sortName!]
        ? 1
        : -1
    );
  }
}
