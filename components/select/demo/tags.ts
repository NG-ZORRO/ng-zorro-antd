import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-tags',
  template: `
    <nz-select
      [nzMode]="'tags'"
      style="width: 400px;"
      [nzPlaceHolder]="'请选择人员'"
      [(ngModel)]="selectedMultipleOption">
      <nz-option
        *ngFor="let option of searchOptions"
        [nzLabel]="option.label"
        [nzValue]="option">
      </nz-option>
    </nz-select>
  `,
  styles  : []
})
export class NzDemoSelectTagsComponent implements OnInit {
  searchOptions = [
    { value: 'jack', label: '杰克' },
    { value: 'lucy', label: '露西' },
    { value: 'tom', label: '汤姆' }
  ];
  selectedMultipleOption = [ this.searchOptions[ 0 ] ];

  ngOnInit() {
    setTimeout(_ => {
      this.selectedMultipleOption = [];
    }, 2000);
  }
}
