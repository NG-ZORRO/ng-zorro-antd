import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

interface MockUser {
  name: {
    first: string;
  };
}

@Component({
  selector: 'nz-demo-select-select-users',
  imports: [FormsModule, NzIconModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="multiple"
      nzPlaceHolder="Select users"
      nzAllowClear
      nzShowSearch
      nzServerSearch
      [(ngModel)]="selectedUser"
      (nzOnSearch)="onSearch($event)"
    >
      @if (!loading) {
        @for (o of optionList; track o) {
          <nz-option [nzValue]="o" [nzLabel]="o"></nz-option>
        }
      } @else {
        <nz-option nzDisabled nzCustomContent>
          <nz-icon nzType="loading" class="loading-icon" />
          Loading Data...
        </nz-option>
      }
    </nz-select>
  `,
  styles: [
    `
      nz-select {
        width: 100%;
      }

      .loading-icon {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoSelectSelectUsersComponent implements OnInit {
  randomUserUrl = 'https://api.randomuser.me/?results=5';
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  loading = false;

  onSearch(value: string): void {
    this.loading = true;
    this.searchChange$.next(value);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchChange$
      .pipe(
        debounceTime(500),
        switchMap(name => this.getRandomNameList(name))
      )
      .subscribe(data => {
        this.optionList = data;
        this.loading = false;
      });
  }

  getRandomNameList(name: string): Observable<string[]> {
    return this.http.get<{ results: MockUser[] }>(`${this.randomUserUrl}`).pipe(
      map(res => res.results),
      catchError(() => of<MockUser[]>([])),
      map(list => list.map(item => `${item.name.first} ${name}`))
    );
  }
}
