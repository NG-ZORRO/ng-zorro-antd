import { Component, OnInit } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'nz-demo-select-search-change',
  template: `
    <nz-select
      style="width: 200px;"
      nzAllowClear
      [nzPlaceHolder]="'input search text'"
      [nzFilter]="false"
      [(ngModel)]="selectedOption"
      (nzSearchChange)="searchChange($event)"
      [nzNotFoundContent]="'无法找到'"
      nzShowSearch>
      <nz-option
        *ngFor="let option of searchOptions"
        [nzLabel]="option[0]"
        [nzValue]="option[0]">
      </nz-option>
    </nz-select>
  `,
  styles  : []
})
export class NzDemoSelectSearchChangeComponent {
  selectedOption;
  searchOptions = [];

  constructor(private jsonp: Jsonp) {
  }

  searchChange(searchText) {
    const query = encodeURI(searchText);
    (this.jsonp.get(`https://suggest.taobao.com/sug?code=utf-8&q=${query}&callback=JSONP_CALLBACK`).map(res => res.json()) as Observable<Response>).subscribe((data: any) => {
      this.searchOptions = data.result;
    });
  }
}
