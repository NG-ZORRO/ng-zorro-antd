import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-label-in-value',
  template: `
    <nz-select style="width: 120px;" [(ngModel)]="selectedValue" (ngModelChange)="log($event)" nzAllowClear nzPlaceHolder="Choose">
      <nz-option *ngFor="let option of optionList" [nzValue]="option" [nzLabel]="option.label"></nz-option>
    </nz-select>
  `
})
export class NzDemoSelectLabelInValueComponent {
  optionList = [
    { label: 'Lucy', value: 'lucy', age: 20 },
    { label: 'Jack', value: 'jack', age: 22 }
  ];
  selectedValue = this.optionList[ 0 ];

  log(value: { label: string, value: string, age: number }): void {
    console.log(value);
  }
}
