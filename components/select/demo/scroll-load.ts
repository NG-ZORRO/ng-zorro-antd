import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
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
      @for (item of optionList(); track item) {
        <nz-option [nzValue]="item" [nzLabel]="item" />
      }
    </nz-select>
    <ng-template #renderTemplate>
      @if (isLoading()) {
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
  private readonly http = inject(HttpClient);

  readonly randomUserUrl: string = 'https://api.randomuser.me/?results=10';
  readonly optionList = signal<string[]>([]);
  readonly selectedUser = signal<string | null>(null);
  readonly isLoading = signal(false);
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
    this.isLoading.set(true);
    this.getRandomNameList().subscribe(data => {
      this.isLoading.set(false);
      this.optionList.update(optionList => [...optionList, ...data]);
    });
  }
}
