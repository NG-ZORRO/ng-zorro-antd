import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-basic',
  template: `
    <nz-select style="width: 120px;" [(ngModel)]="selectedOption" nzAllowClear>
      <nz-option
        *ngFor="let option of options"
        [nzLabel]="option.label"
        [nzValue]="option"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
    <nz-select style="width: 120px;" [(ngModel)]="selectedOption" [nzDisabled]="true">
      <nz-option
        *ngFor="let option of options"
        [nzLabel]="option.label"
        [nzValue]="option"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
  `,
  styles  : []
})
export class NzDemoSelectBasicComponent implements OnInit {
  options = [];
  selectedOption;

  constructor() {
  }

  ngOnInit() {
    /*模拟服务器异步加载*/
    setTimeout(_ => {
      this.options = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'disabled', label: 'Disabled', disabled: true }
      ];
      this.selectedOption = this.options[ 0 ];
    }, 100);
  }
}


