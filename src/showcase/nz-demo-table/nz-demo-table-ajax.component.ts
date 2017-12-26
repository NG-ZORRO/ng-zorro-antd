import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(pageIndex = 1, pageSize = 10, sortField, sortOrder, genders) {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get(`${this.randomUserUrl}`, {
      params: params
    })
  }

  constructor(private http: HttpClient) {
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector : 'nz-demo-table-ajax',
  providers: [ RandomUserService ],
  template : `
    <nz-table #nzTable
      [nzAjaxData]="_dataSet"
      nzShowSizeChanger
      [nzLoading]="_loading"
      [nzTotal]="_total"
      [(nzPageIndex)]="_current"
      (nzPageIndexChange)="refreshData()"
      [(nzPageSize)]="_pageSize"
      (nzPageSizeChange)="refreshData(true)">
      <thead nz-thead>
        <tr>
          <th nz-th>
            <span>Name</span>
            <nz-table-sort (nzValueChange)="sort($event)"></nz-table-sort>
          </th>
          <th nz-th>
            <span>Gender</span>
            <nz-dropdown [nzTrigger]="'click'">
              <i class="anticon anticon-filter" nz-dropdown></i>
              <ul nz-menu>
                <li nz-menu-item *ngFor="let filter of _filterGender">
                  <label nz-checkbox [(ngModel)]="filter.value">
                    <span>{{filter.name}}</span>
                  </label>
                </li>
              </ul>
              <div nz-table-filter>
                <span nz-table-filter-confirm (click)="refreshData(true)">OK</span>
                <span nz-table-filter-clear (click)="reset()">Reset</span>
              </div>
            </nz-dropdown>
          </th>
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
  _sortValue = null;
  _filterGender = [
    { name: 'male', value: false },
    { name: 'female', value: false }
  ];

  sort(value) {
    this._sortValue = value;
    this.refreshData();
  }

  reset() {
    this._filterGender.forEach(item => {
      item.value = false;
    });
    this.refreshData(true);
  }

  constructor(private _randomUser: RandomUserService) {
  }

  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;
    const selectedGender = this._filterGender.filter(item => item.value).map(item => item.name);
    this._randomUser.getUsers(this._current, this._pageSize, 'name', this._sortValue, selectedGender).subscribe((data: any) => {
      this._loading = false;
      this._total = 200;
      this._dataSet = data.results;
    })
  }

  ngOnInit() {
    this.refreshData();
  }
}
