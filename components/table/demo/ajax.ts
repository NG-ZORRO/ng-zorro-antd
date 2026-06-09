import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';

interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

@Component({
  selector: 'nz-demo-table-ajax',
  imports: [NzTableModule],
  template: `
    <nz-table
      nzShowSizeChanger
      [nzData]="listOfRandomUser()"
      [nzFrontPagination]="false"
      [nzLoading]="loading()"
      [nzTotal]="total()"
      [nzPageSize]="pageSize"
      [nzPageIndex]="pageIndex"
      (nzQueryParams)="onQueryParamsChange($event)"
    >
      <thead>
        <tr>
          <th nzColumnKey="name" [nzSortFn]="true">Name</th>
          <th nzColumnKey="gender" [nzFilters]="filterGender" [nzFilterFn]="true">Gender</th>
          <th nzColumnKey="email" [nzSortFn]="true">Email</th>
        </tr>
      </thead>
      <tbody>
        @for (data of listOfRandomUser(); track data) {
          <tr>
            <td>{{ data.name.first }} {{ data.name.last }}</td>
            <td>{{ data.gender }}</td>
            <td>{{ data.email }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableAjaxComponent implements OnInit {
  private readonly http = inject(HttpClient);

  readonly total = signal(1);
  readonly listOfRandomUser = signal<RandomUser[]>([]);
  readonly loading = signal(true);
  readonly pageSize = 10;
  readonly pageIndex = 1;
  readonly filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading.set(true);
    this.getUsers(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(data => {
      this.loading.set(false);
      this.total.set(200); // mock the total data here
      this.listOfRandomUser.set(data.results);
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }
  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
  }

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<{ results: RandomUser[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http
      .get<{ results: RandomUser[] }>('https://api.randomuser.me/', { params })
      .pipe(catchError(() => of({ results: [] })));
  }
}
