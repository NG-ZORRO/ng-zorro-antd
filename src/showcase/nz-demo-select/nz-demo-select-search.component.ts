import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-search',
  template: `
    <nz-select
      style="width: 200px;"
      nzAllowClear
      [nzPlaceHolder]="'Select a person'"
      [(ngModel)]="selectedOption"
      nzShowSearch>
      <nz-option
        *ngFor="let option of searchOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
    <nz-select
      style="width: 200px;"
      nzAllowClear
      [nzPlaceHolder]="'Select a person'"
      [(ngModel)]="selectedOption"
      nzShowSearch>
      <nz-option
        *ngFor="let option of searchOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
  `,
  styles  : []
})
export class NzDemoSelectSearchComponent implements OnInit {
  selectedOption;
  searchOptions;

  ngOnInit() {
    /*模拟服务器异步加载*/
    setTimeout(_ => {
      this.searchOptions = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' }
      ];
    }, 100);
  }
}

