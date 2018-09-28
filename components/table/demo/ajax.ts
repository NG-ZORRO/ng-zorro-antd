import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(pageIndex: number = 1, pageSize: number = 10, sortField: string, sortOrder: string, genders: string[]): Observable<{}> {
    let params = new HttpParams()
    .append('page', `${pageIndex}`)
    .append('results', `${pageSize}`)
    .append('sortField', sortField)
    .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get(`${this.randomUserUrl}`, {
      params
    });
  }

  constructor(private http: HttpClient) {
  }
}

@Component({
  selector : 'nz-demo-table-ajax',
  providers: [ RandomUserService ],
  template : `
    <nz-table
      #ajaxTable
      nzShowSizeChanger
      [nzFrontPagination]="false"
      [nzData]="dataSet"
      [nzLoading]="loading"
      [nzTotal]="total"
      [(nzPageIndex)]="pageIndex"
      [(nzPageSize)]="pageSize"
      (nzPageIndexChange)="searchData()"
      (nzPageSizeChange)="searchData(true)">
      <thead (nzSortChange)="sort($event)" nzSingleSort>
        <tr>
          <th nzShowSort nzSortKey="name">Name</th>
          <th nzShowFilter [nzFilters]="filterGender" (nzFilterChange)="updateFilter($event)">Gender</th>
          <th nzShowSort nzSortKey="email"><span>Email</span></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of ajaxTable.data">
          <td>{{data.name.first}} {{data.name.last}}</td>
          <td>{{data.gender}}</td>
          <td>{{data.email}}</td>
        </tr>
      </tbody>
    </nz-table>`
})
export class NzDemoTableAjaxComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  searchGenderList: string[] = [];

  sort(sort: { key: string, value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  constructor(private randomUserService: RandomUserService) {
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.randomUserService.getUsers(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, this.searchGenderList).subscribe((data: any) => {
      this.loading = false;
      this.total = 200;
      this.dataSet = data.results;
    });
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }

  ngOnInit(): void {
    this.searchData();
  }
}
