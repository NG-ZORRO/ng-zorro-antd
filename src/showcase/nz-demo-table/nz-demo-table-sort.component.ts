import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-sort',
  template: `
    <nz-table #nzTable [nzDataSource]="data" [nzPageSize]="10">
      <thead nz-thead>
        <tr>
          <th nz-th>
            <span>
              Name
            </span>
          </th>
          <th nz-th>
            <span>
              Age
              <nz-table-sort [(nzValue)]="ageSort" (nzValueChange)="ageSortChange($event)"></nz-table-sort>
            </span>
          </th>
          <th nz-th><span>Address</span></th>
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
  styles  : []
})
export class NzDemoTableSortComponent implements OnInit {
  ageSort = 'false';
  data = [ {
    key    : '1',
    name   : 'John Brown',
    age    : 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key    : '2',
    name   : 'Jim Green',
    age    : 42,
    address: 'London No. 1 Lake Park',
  }, {
    key    : '3',
    name   : 'Joe Black',
    age    : 32,
    address: 'Sidney No. 1 Lake Park',
  } ];

  ageSortChange($event) {
    if ($event === 'ascend') {
      this.data = [ ...this.data.sort((a, b) => {
        return a.age - b.age;
      }) ];
    } else if ($event === 'descend') {
      this.data = [ ...this.data.sort((a, b) => {
        return b.age - a.age;
      }) ];
    }
  }

  constructor() {
  }

  ngOnInit() {
  }
}

