import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-tag',
  template: `
    <nz-select
      style="width: 400px;"
      [nzTags]="true"
      [nzPlaceHolder]="'请选择人员'"
      [(ngModel)]="selectedMultipleOption"
      [nzNotFoundContent]="'无法找到'"
      [nzShowSearch]="true">
      <nz-option
        *ngFor="let option of searchOptions"
        [nzLabel]="option.label"
        [nzValue]="option">
      </nz-option>
    </nz-select>
  `,
  styles  : []
})
export class NzDemoSelectTagComponent implements OnInit {
  searchOptions = [
    { value: 'jack', label: '杰克' },
    { value: 'lucy', label: '露西' },
    { value: 'tom', label: '汤姆' }
  ];
  selectedMultipleOption = [ this.searchOptions[ 0 ] ];

  constructor() {
  }

  ngOnInit() {
    setTimeout(_ => {
      this.selectedMultipleOption = [];
    }, 2000)
  }
}

