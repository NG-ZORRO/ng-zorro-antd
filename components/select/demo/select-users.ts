import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'nz-demo-select-select-users',
  template: `
    <nz-select style="width: 100%;" [(ngModel)]="selectedUser" nzPlaceHolder="Select users" nzAllowClear nzShowSearch [nzFilterOption]="filterOption" (nzOnSearch)="onSearch($event)">
      <ng-container *ngIf="!isLoading">
        <nz-option *ngFor="let o of optionList" [nzValue]="o" [nzLabel]="o"></nz-option>
      </ng-container>
      <nz-option *ngIf="isLoading" nzDisabled nzCustomContent>
        <i class="anticon anticon-loading anticon-spin loading-icon"></i> Loading Data...
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

  /** disable default filter function **/
  filterOption = () => true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const getRandomNameList = (name: string) => {
      // tslint:disable-next-line:no-any
      return this.http.get(`${this.randomUserUrl}`).pipe(map((res: any) => res.results)).pipe(map((list: any) => {
        return list.map(item => `${item.name.first}-${item.name.last} ${name}`);
      }));
    };
    const optionList$: Observable<string[]> = this.searchChange$.asObservable().pipe(debounceTime(500)).pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    });
  }
}
