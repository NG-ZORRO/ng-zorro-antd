import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-multiple',
  template: `
    <nz-select style="width: 400px;"
      [nzMode]="'multiple'"
      [nzPlaceHolder]="'请选择人员'"
      [(ngModel)]="selectedMultipleOption"
      [nzNotFoundContent]="'无法找到'">
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
export class NzDemoSelectMultipleComponent implements OnInit {
  searchOptions;
  selectedMultipleOption;

  ngOnInit() {
    /*模拟服务器异步加载*/
    this.selectedMultipleOption = [ 'tom', 'jack' ];
    setTimeout(_ => {
      this.searchOptions = [
        { value: 'jack', label: '杰克' },
        { value: 'lucy', label: '露西' },
        { value: 'tom', label: '汤姆' }
      ];
    }, 300);
    setTimeout(_ => {
      this.selectedMultipleOption = [ 'tom' ];
    }, 1000);
  }
}

