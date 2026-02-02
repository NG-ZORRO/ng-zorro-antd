import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

interface MockUser {
  name: {
    first: string;
  };
}

@Component({
  selector: 'nz-demo-select-scroll-load',
  imports: [FormsModule, NzSelectModule, NzSpinModule],
  template: `
    <nz-select
      [(ngModel)]="selectedUser"
      (nzScrollToBottom)="loadMore()"
      nzPlaceHolder="Select users"
      nzAllowClear
      [nzDropdownRender]="renderTemplate"
    >
      @for (item of optionList; track item) {
        <nz-option [nzValue]="item" [nzLabel]="item" />
      }
    </nz-select>
    <ng-template #renderTemplate>
      @if (isLoading) {
        <nz-spin />
      }
    </ng-template>
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectScrollLoadComponent implements OnInit {
  readonly randomUserUrl: string = 'https://api.randomuser.me/?results=10';
  optionList: string[] = [];
  selectedUser: string | null = null;
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMore();
  }

  getRandomNameList(): Observable<string[]> {
    return this.http
      .get<{ results: MockUser[] }>(`${this.randomUserUrl}`)
      .pipe(
        map(res => res.results),
        catchError(() => of<MockUser[]>([]))
      )
      .pipe(map(list => list.map(item => `${item.name.first}`)));
  }

  loadMore(): void {
    this.isLoading = true;
    this.getRandomNameList().subscribe(data => {
      this.isLoading = false;
      this.optionList = [...this.optionList, ...data];
    });
  }
}
