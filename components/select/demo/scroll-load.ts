import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
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
  imports: [NzSelectModule, NzSpinModule],
  template: `
    <nz-select
      [nzOptions]="options()"
      (nzScrollToBottom)="loadMore()"
      nzPlaceHolder="Select users"
      nzAllowClear
      [nzDropdownRender]="renderTemplate"
    />
    <ng-template #renderTemplate>
      @if (loading()) {
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

  readonly options = signal<Array<{ label: string; value: string }>>([]);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.loadMore();
  }

  getRandomNameList(): Observable<string[]> {
    return this.http.get<{ results: MockUser[] }>('https://api.randomuser.me/?results=10').pipe(
      map(res => res.results.map(item => item.name.first)),
      catchError(() => of<string[]>([]))
    );
  }

  loadMore(): void {
    this.loading.set(true);
    this.getRandomNameList().subscribe(data => {
      this.loading.set(false);
      this.options.update(options => [...options, ...data.map(item => ({ label: item, value: item }))]);
    });
  }
}
