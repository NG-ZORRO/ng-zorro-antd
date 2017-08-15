import { Component, OnInit } from '@angular/core';
import { RandomUserService } from './randomUser.service';

@Component({
  selector : 'nz-demo-table-ajax',
  providers: [ RandomUserService ],
  template : `
    <nz-table #nzTable
      [nzAjaxData]="_dataSet"
      [nzShowSizeChanger]="true"
      [nzLoading]="_loading"
      [nzTotal]="_total"
      [(nzPageIndex)]="_current"
      (nzPageIndexChange)="_refreshData()"
      [(nzPageSize)]="_pageSize"
      (nzPageSizeChange)="_refreshData()">
      <thead nz-thead>
        <tr>
          <th nz-th><span>Name</span></th>
          <th nz-th><span>Age</span></th>
          <th nz-th><span>Email</span></th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of nzTable.data">
          <td nz-td>
            <a>{{data.name.first}} {{data.name.last}}</a>
          </td>
          <td nz-td>{{data.gender}}</td>
          <td nz-td>{{data.email}}</td>
        </tr>
      </tbody>
    </nz-table>`,
  styles   : []
})
export class NzDemoTableAjaxComponent implements OnInit {
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = true;

  constructor(private _randomUser: RandomUserService) {
  }

  _refreshData = () => {
    this._loading = true;
    this._randomUser.getUsers(this._current, this._pageSize).subscribe((data: any) => {
      this._loading = false;
      this._total = 200;
      this._dataSet = data.results;
    })
  };

  ngOnInit() {
    this._refreshData();
  }
}

