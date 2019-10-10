import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-frontend-search',
  template: `
    <nz-select
      nzMode="multiple"
      [(ngModel)]="selectedUser"
      nzPlaceHolder="Type a10 to search"
      nzAllowClear
      nzShowSearch
      [nzServerSearch]="true"
      (nzOnSearch)="onSearch($event)"
    >
      <nz-option *ngFor="let o of optionList" [nzValue]="o" [nzLabel]="o"></nz-option>
      <nz-option *ngIf="displayTips" nzDisabled nzCustomContent>
        Type at lease 2 letters to Search
      </nz-option>
    </nz-select>
  `,
  styles: [
    `
      nz-select {
        width: 100%;
      }
    `
  ]
})
export class NzDemoSelectFrontendSearchComponent {
  bigList: string[] = new Array(10000).fill(0).map((_, i) => i.toString(36) + i);
  optionList: string[] = [];
  selectedUser: string;
  displayTips = true;

  onSearch(value: string): void {
    if (value && value.length > 1) {
      this.optionList = this.bigList.filter(item => item.indexOf(value) > -1);
      this.displayTips = false;
    } else {
      this.optionList = [];
      this.displayTips = true;
    }
  }

  constructor() {}
}
