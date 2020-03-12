import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

@Injectable({ providedIn: 'root' })
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(
    pageIndex: number = 1,
    pageSize: number = 10,
    sortField: string,
    sortOrder: string,
    genders: string[]
  ): Observable<{ results: RandomUser[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params });
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'nz-demo-table-ajax',
  template: `
    <nz-table
      nzShowSizeChanger
      [nzData]="listOfRandomUser"
      [nzFrontPagination]="false"
      [nzLoading]="loading"
      [nzTotal]="total"
      [nzPageIndex]="pageIndex"
      [nzPageSize]="pageSize"
      (nzPageIndexChange)="onPageIndexChange($event)"
      (nzPageSizeChange)="onPageSizeChange($event)"
    >
      <thead (nzSortOrderChange)="onSortChange($event)" nzSingleSort>
        <tr>
          <th nzSortKey="name">Name</th>
          <th [nzFilters]="filterGender" (nzFilterChange)="onFilterChange($event)">Gender</th>
          <th nzSortKey="email"><span>Email</span></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of listOfRandomUser">
          <td>{{ data.name.first }} {{ data.name.last }}</td>
          <td>{{ data.gender }}</td>
          <td>{{ data.email }}</td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableAjaxComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  sortOrder: string | null = null;
  sortKey: string | null = null;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  searchGenderList: string[] = [];

  onSortChange(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortOrder = sort.value;
    this.getRandomUserList();
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.getRandomUserList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.getRandomUserList();
  }

  onFilterChange(value: string[]): void {
    this.searchGenderList = value;
    this.pageIndex = 1;
    this.getRandomUserList();
  }

  getRandomUserList(): void {
    this.loading = true;
    this.randomUserService
      .getUsers(this.pageIndex, this.pageSize, this.sortKey!, this.sortOrder!, this.searchGenderList)
      .subscribe(data => {
        this.loading = false;
        this.total = 200;
        this.listOfRandomUser = data.results;
      });
  }

  constructor(private randomUserService: RandomUserService) {}

  ngOnInit(): void {
    this.getRandomUserList();
  }
}
