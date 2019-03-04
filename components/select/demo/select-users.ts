import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'nz-demo-select-select-users',
  template: `
    <nz-select style="width: 100%;" nzMode="multiple" [(ngModel)]="selectedUser" nzPlaceHolder="Select users" nzAllowClear nzShowSearch [nzServerSearch]="true" (nzOnSearch)="onSearch($event)">
      <ng-container *ngFor="let o of optionList">
        <nz-option *ngIf="!isLoading" [nzValue]="o" [nzLabel]="o"></nz-option>
      </ng-container>
      <nz-option *ngIf="isLoading" nzDisabled nzCustomContent>
        <i nz-icon type="loading" class="loading-icon"></i> Loading Data...
      </nz-option>
    </nz-select>
  `,
  styles  : [ `
    .loading-icon {
      margin-right: 8px;
    }
  ` ]
})
export class NzDemoSelectSelectUsersComponent implements OnInit {
  randomUserUrl = 'https://api.randomuser.me/?results=5';
  searchChange$ = new BehaviorSubject('');
  optionList = [];
  selectedUser;
  isLoading = false;

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // tslint:disable-next-line:no-any
    const getRandomNameList = (name: string) => this.http.get(`${this.randomUserUrl}`).pipe(map((res: any) => res.results)).pipe(map((list: any) => {
      return list.map(item => `${item.name.first} ${name}`);
    }));
    const optionList$: Observable<string[]> = this.searchChange$.asObservable().pipe(debounceTime(500)).pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    });
  }
}
