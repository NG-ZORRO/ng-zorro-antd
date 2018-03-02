import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-grouping-columns',
  template: `
    <nz-table
      #groupingTable
      [nzData]="displayData"
      nzBordered
      nzSize="middle"
      [nzWidthConfig]="['100px','200px','200px','100px','100px',null,null,'60px']"
      [nzScroll]="{ x:'130%',y: '240px' }">
      <thead nz-thead>
        <tr nz-tr style="height: 46px;">
          <th nz-th rowspan="4" nzLeft="0px" nzShowFilter [nzFilters]="filterName" (nzFilterChange)="search($event)">Name</th>
          <th nz-th colspan="4">Other</th>
          <th nz-th colspan="2">Company</th>
          <th nz-th rowspan="4" nzRight="0px">Gender</th>
        </tr>
        <tr nz-tr style="height: 46px;">
          <th nz-th rowspan="3" nzShowSort [(nzSort)]="sortValue" (nzSortChange)="search(searchName)">Age</th>
          <th nz-th colspan="3">Address</th>
          <th nz-th rowspan="3">Company Address</th>
          <th nz-th rowspan="3">Company Name</th>
        </tr>
        <tr nz-tr style="height: 46px;">
          <th nz-th rowspan="2">Street</th>
          <th nz-th colspan="2">Block</th>
        </tr>
        <tr nz-tr style="height: 46px;">
          <th nz-th>Building</th>
          <th nz-th>Door No.</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tr *ngFor="let data of groupingTable.data">
          <td nz-td nzLeft="0px">{{data.name}}</td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.street}}</td>
          <td nz-td>{{data.building}}</td>
          <td nz-td>{{data.number}}</td>
          <td nz-td>{{data.companyAddress}}</td>
          <td nz-td>{{data.companyName}}</td>
          <td nz-td nzRight="0px">{{data.gender}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableGroupingColumnsComponent implements OnInit {
  displayData = [];
  data = [];
  sortValue = null;
  filterName = [
    { text: 'Joe', value: 'Joe' },
    { text: 'John', value: 'John' }
  ];
  searchName = [];

  search(searchName: string[]): void {
    this.searchName = searchName;
    const filterFunc = (item) => {
      return this.searchName.length ? this.searchName.some(name => item.name.indexOf(name) !== -1) : true;
    };
    const data = this.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a.age > b.age ? 1 : -1) : (b.age > a.age ? 1 : -1));
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.displayData.push({
        name          : 'John Brown',
        age           : i + 1,
        street        : 'Lake Park',
        building      : 'C',
        number        : 2035,
        companyAddress: 'Lake Street 42',
        companyName   : 'SoftLake Co',
        gender        : 'M'
      });
    }
    this.data = [ ...this.displayData ];
  }
}
