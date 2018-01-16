import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-grouping-columns',
  template: `
    <nz-table #nzTable [nzDataSource]="dataSet" nzBordered nzSize="middle" [nzPageSize]="10" [nzScroll]="{ x:'130%',y: '240px' }">
      <ng-template #nzColgroup>
        <colgroup>
          <col nz-col nzWidth="100px">
          <col nz-col nzWidth="200px">
          <col nz-col nzWidth="200px">
          <col nz-col nzWidth="100px">
          <col nz-col nzWidth="100px">
          <col>
          <col>
          <col nz-col nzWidth="60px">
        </colgroup>
      </ng-template>
      <ng-template #nzFixedHeader>
        <thead nz-thead>
          <tr style="height: 46px;">
            <th nz-th rowspan="4" nzLeft="0px">
              <span>Name</span>
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
                  <span nz-table-filter-clear (click)="reset()">Reset</span>
                </div>
              </nz-dropdown>
            </th>
            <th nz-th colspan="4"><span>Other</span></th>
            <th nz-th colspan="2"><span>Company</span></th>
            <th nz-th rowspan="4" nzRight="0px"><span>Gender</span></th>
          </tr>
          <tr style="height: 46px;">
            <th nz-th rowspan="3">
              <span>Age</span>
              <nz-table-sort [(nzValue)]="sortValue" (nzValueChange)="search()"></nz-table-sort>
            </th>
            <th nz-th colspan="3"><span>Address</span></th>
            <th nz-th rowspan="3"><span>Company Address</span></th>
            <th nz-th rowspan="3"><span>Company Name</span></th>
          </tr>
          <tr style="height: 46px;">
            <th nz-th rowspan="2"><span>Street</span></th>
            <th nz-th colspan="2"><span>Block</span></th>
          </tr>
          <tr style="height: 46px;">
            <th nz-th><span>Building</span></th>
            <th nz-th><span>Door No.</span></th>
          </tr>
        </thead>
      </ng-template>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of nzTable.data">
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
  dataSet = [];
  backData = [];
  sortValue = null;
  filterNameArray = [
    { name: 'Joe', value: false },
    { name: 'John', value: false },
  ];

  reset(): void {
    this.filterNameArray = [
      { name: 'Joe', value: false },
      { name: 'John', value: false },
    ];
    this.search();
  }

  search(): void {
    const searchName = this.filterNameArray.filter(name => name.value);
    const filterFunc = (item) => {
      return searchName.length ? searchName.some(name => item.name.indexOf(name.name) !== -1) : true
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
        gender        : 'M',
      });
    }
    this.backData = [ ...this.dataSet ];
  }
}
