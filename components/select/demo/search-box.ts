import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-search-box',
  imports: [NzSelectModule],
  template: `
    <nz-select
      [nzOptions]="options()"
      nzShowSearch
      nzServerSearch
      nzPlaceHolder="input search text"
      [nzShowArrow]="false"
      [nzFilterOption]="filterFn"
      (nzOnSearch)="search($event)"
    />
  `,
  styles: `
    nz-select {
      width: 200px;
    }
  `
})
export class NzDemoSelectSearchBoxComponent {
  private readonly http = inject(HttpClient);

  readonly options = signal<Array<{ label: string; value: string }>>([]);
  readonly filterFn = (): boolean => true;

  search(value: string): void {
    this.http
      .jsonp<{ result: Array<[string, string]> }>(`https://suggest.taobao.com/sug?code=utf-8&q=${value}`, 'callback')
      .subscribe(data => {
        const options = data.result.map(([item]) => ({ label: item, value: item }));
        this.options.set(options);
      });
  }
}
