import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
      @for (item of listOfOption; track item) {
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
  selectedValue: string | null = null;
  listOfOption: string[] = [];
  readonly nzFilterOption = (): boolean => true;

  constructor(private http: HttpClient) {}

  search(value: string): void {
    this.http
      .jsonp<{ result: Array<[string, string]> }>(`https://suggest.taobao.com/sug?code=utf-8&q=${value}`, 'callback')
      .subscribe(data => {
        this.listOfOption = data.result.map(([item]) => item);
      });
  }
}
