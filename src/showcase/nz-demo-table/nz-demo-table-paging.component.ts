import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-paging',
  template: `
    <nz-table #nzTable [nzDataSource]="_dataSet" [nzPageSize]="10" nzShowSizeChanger>
      <thead nz-thead>
        <tr>
          <th nz-th><span>Name</span></th>
          <th nz-th><span>Age</span></th>
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
export class NzDemoTablePagingComponent implements OnInit {
  _dataSet = [];

  ngOnInit() {
    for (let i = 0; i < 46; i++) {
      this._dataSet.push({
        key    : i,
        name   : `Edward King ${i}`,
        age    : 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
  }
}

