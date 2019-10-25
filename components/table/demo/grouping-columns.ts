import { Component, OnInit } from '@angular/core';

interface ItemData {
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
}

@Component({
  selector: 'nz-demo-table-grouping-columns',
  template: `
    <nz-table
      #groupingTable
      [nzData]="listOfDisplayData"
      nzBordered
      nzSize="middle"
      [nzWidthConfig]="widthConfig"
      [nzScroll]="scrollConfig"
    >
      <thead>
        <tr>
          <th rowspan="4" nzLeft="0px" nzShowFilter [nzFilters]="filterName" (nzFilterChange)="search($event)">Name</th>
          <th colspan="4">Other</th>
          <th colspan="2">Company</th>
          <th rowspan="4" nzRight="0px">Gender</th>
        </tr>
        <tr>
          <th rowspan="3" nzShowSort [(nzSort)]="sortValue" (nzSortChange)="search(searchName)">Age</th>
          <th colspan="3">Address</th>
          <th rowspan="3">Company Address</th>
          <th rowspan="3">Company Name</th>
        </tr>
        <tr>
          <th rowspan="2">Street</th>
          <th colspan="2">Block</th>
        </tr>
        <tr>
          <th>Building</th>
          <th>Door No.</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of groupingTable.data">
          <td nzLeft="0px">{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.street }}</td>
          <td>{{ data.building }}</td>
          <td>{{ data.number }}</td>
          <td>{{ data.companyAddress }}</td>
          <td>{{ data.companyName }}</td>
          <td nzRight="0px">{{ data.gender }}</td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableGroupingColumnsComponent implements OnInit {
  widthConfig = ['100px', '200px', '200px', '100px', '100px', '200px', '200px', '100px'];
  scrollConfig = { x: '1200px', y: '240px' };
  listOfDisplayData: ItemData[] = [];
  listOfData: ItemData[] = [];
  sortValue: 'ascend' | 'descend' | null = null;
  filterName = [{ text: 'Joe', value: 'Joe' }, { text: 'John', value: 'John' }];
  searchName: string[] = [];

  search(searchName: string[]): void {
    this.searchName = searchName;
    const filterFunc = (item: ItemData) => {
      return this.searchName.length ? this.searchName.some(name => item.name.indexOf(name) !== -1) : true;
    };
    const listOfData = this.listOfData.filter(item => filterFunc(item));
    this.listOfDisplayData = listOfData.sort((a, b) =>
      this.sortValue === 'ascend' ? (a.age > b.age ? 1 : -1) : b.age > a.age ? 1 : -1
    );
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: 'John Brown',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M'
      });
    }
    this.listOfDisplayData = [...this.listOfData];
  }
}
