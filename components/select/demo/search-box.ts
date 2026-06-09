import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-search-box',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzShowSearch
      nzServerSearch
      nzPlaceHolder="input search text"
      [(ngModel)]="selectedValue"
      [nzShowArrow]="false"
      [nzFilterOption]="nzFilterOption"
      (nzOnSearch)="search($event)"
    >
      @for (item of listOfOption(); track item) {
        <nz-option [nzLabel]="item" [nzValue]="item" />
      }
    </nz-select>
  `,
  styles: `
    nz-select {
      width: 200px;
    }
  `
})
export class NzDemoSelectSearchBoxComponent {
  private readonly http = inject(HttpClient);

  readonly selectedValue = signal<string | null>(null);
  readonly listOfOption = signal<string[]>([]);
  readonly nzFilterOption = (): boolean => true;
  search(value: string): void {
    this.http
      .jsonp<{ result: Array<[string, string]> }>(`https://suggest.taobao.com/sug?code=utf-8&q=${value}`, 'callback')
      .subscribe(data => {
        this.listOfOption.set(data.result.map(([item]) => item));
      });
  }
}
