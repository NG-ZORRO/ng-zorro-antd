import { Component } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'nz-demo-select-multiple-change',
  template: `
    <nz-select
      style="width: 400px;"
      nzKeepUnListOptions
      [nzMode]="'multiple'"
      [nzPlaceHolder]="'请选择关键字'"
      (nzSearchChange)="searchChange($event)"
      [(ngModel)]="selectedMultipleOption"
      [nzNotFoundContent]="'无法找到'">
      <nz-option
        *ngFor="let option of searchOptions"
        [nzLabel]="option[0]"
        [nzValue]="option[0]">
      </nz-option>
    </nz-select>
  `,
  styles  : []
})
export class NzDemoSelectMultipleChangeComponent {
  searchOptions;
  selectedMultipleOption = [];

  constructor(private jsonp: Jsonp) {
  }

  searchChange(searchText) {
    const query = encodeURI(searchText);
    (this.jsonp.get(`https://suggest.taobao.com/sug?code=utf-8&q=${query}&callback=JSONP_CALLBACK`).map(res => res.json()) as Observable<Response>).subscribe((data: any) => {
      this.searchOptions = data.result;
    });
  }
}
