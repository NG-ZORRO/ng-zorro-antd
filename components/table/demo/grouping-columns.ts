import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-grouping-columns',
  template: `
    <nz-table #nzTable [nzDataSource]="dataSet" nzBordered nzSize="middle" [nzPageSize]="10" [nzScroll]="{ x:'130%',y: '240px' }">
      <ng-template #nzColgroup>
        <colgroup>
          <col nz-column nzWidth="100px">
          <col nz-column nzWidth="200px">
          <col nz-column nzWidth="200px">
          <col nz-column nzWidth="100px">
          <col nz-column nzWidth="100px">
          <col>
          <col>
          <col nz-column nzWidth="60px">
        </colgroup>
      </ng-template>
      <ng-template #nzFixedHeader>
        <thead>
          <tr style="height: 46px;">
            <th rowspan="4" nzLeft="0px">
              Name
              <nz-dropdown [nzTrigger]="'click'">
                <i class="anticon anticon-filter" nz-dropdown></i>
                <ul nz-menu>
                  <li nz-menu-item *ngFor="let filter of filterNameArray">
                    <label nz-checkbox [(ngModel)]="filter.value">
                      {{filter.name}}
                    </label>
                  </li>
                </ul>
                <div nz-table-filter>
                  <span nz-table-filter-confirm (click)="search()">OK</span>
                  <span nz-table-filter-clear (click)="reset()">Reset</span>
                </div>
              </nz-dropdown>
            </th>
            <th colspan="4">Other</th>
            <th colspan="2">Company</th>
            <th rowspan="4" nzRight="0px">Gender</th>
          </tr>
          <tr style="height: 46px;">
            <th rowspan="3" [(nzSort)]="sortValue" (nzSortChange)="search()">Age</th>
            <th colspan="3">Address</th>
            <th rowspan="3">Company Address</th>
            <th rowspan="3">Company Name</th>
          </tr>
          <tr style="height: 46px;">
            <th rowspan="2">Street</th>
            <th colspan="2">Block</th>
          </tr>
          <tr style="height: 46px;">
            <th>Building</th>
            <th>Door No.</th>
          </tr>
        </thead>
      </ng-template>
      <tbody>
        <tr *ngFor="let data of nzTable.data">
          <td nzLeft="0px">{{data.name}}</td>
          <td>{{data.age}}</td>
          <td>{{data.street}}</td>
          <td>{{data.building}}</td>
          <td>{{data.number}}</td>
          <td>{{data.companyAddress}}</td>
          <td>{{data.companyName}}</td>
          <td nzRight="0px">{{data.gender}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableGroupingColumnsComponent implements OnInit {
  dataSet = [];
  backData = [];
  sortValue = null;
  filterNameArray = [
    { name: 'Joe', value: false },
    { name: 'John', value: false }
  ];

  reset(): void {
    this.filterNameArray = [
      { name: 'Joe', value: false },
      { name: 'John', value: false }
    ];
    this.search();
  }

  search(): void {
    const searchName = this.filterNameArray.filter(name => name.value);
    const filterFunc = (item) => {
      return searchName.length ? searchName.some(name => item.name.indexOf(name.name) !== -1) : true;
    };
    this.dataSet = [ ...this.backData.filter(item => filterFunc(item)) ];
    this.dataSet = [ ...this.dataSet.sort((a, b) => {
      if (a.age > b.age) {
        return (this.sortValue === 'ascend') ? 1 : -1;
      } else if (a.age < b.age) {
        return (this.sortValue === 'ascend') ? -1 : 1;
      } else {
        return 0;
      }
    }) ];
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
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
    this.backData = [ ...this.dataSet ];
  }
}
