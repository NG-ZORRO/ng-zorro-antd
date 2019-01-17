import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-search-box',
  template: `
    <nz-select
      style="width: 200px;"
      nzShowSearch
      nzServerSearch
      nzPlaceHolder="input search text"
      [nzShowArrow]="false"
      [nzFilterOption]="nzFilterOption"
      [(ngModel)]="selectedValue"
      (nzOnSearch)="search($event)">
      <nz-option *ngFor="let o of listOfOption"
        [nzLabel]="o.text"
        [nzValue]="o.value">
      </nz-option>
    </nz-select>
  `
})
export class NzDemoSelectSearchBoxComponent {
  selectedValue;
  listOfOption = [];
  nzFilterOption = () => true;

  constructor(private httpClient: HttpClient) {

  }

  search(value: string): void {
    this.httpClient.jsonp<{ result: Array<[ string, string ]> }>(`https://suggest.taobao.com/sug?code=utf-8&q=${value}`, 'callback').subscribe(data => {
      const listOfOption = [];
      data.result.forEach(item => {
        listOfOption.push({
          value: item[ 0 ],
          text : item[ 0 ]
        });
      });
      this.listOfOption = listOfOption;
    });
  }
}
