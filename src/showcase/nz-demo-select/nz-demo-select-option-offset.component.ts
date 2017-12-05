import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nz-demo-select-option-class',
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
        [nzValue]="option"
        [nzOffSet]="option.offset"
        >  
      </nz-option>
    </nz-select>
  `,
  styles: [`
    `]
})
export class NzDemoSelectOptionClassComponent implements OnInit {
  searchOptions = [
    {value: 'group01', label: '第一小组'},
    {value: 'lucy', label: '露西', offset: 50},
    {value: 'tom', label: '汤姆', offset: 50},
    {value: 'group', label: '第二小组'},
    {value: 'jack', label: '第二小组第一分组', offset: 50},
    {value: 'jack', label: '杰克', offset: 100},
    {value: 'sam', label: '山姆', offset: 50}
  ];
  selectedMultipleOption = [this.searchOptions[0]];

  constructor() {
  }

  ngOnInit() {
    setTimeout(_ => {
      this.selectedMultipleOption = [];
    }, 2000)
  }
}

