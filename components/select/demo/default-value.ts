import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-default-value',
  template: `
    <nz-select
      style="width: 100%"
      nzMode="multiple"
      nzPlaceHolder="Inserted are removed"
      [(ngModel)]="listOfSelectedValue"
    >
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option" [nzValue]="option"></nz-option>
      <nz-option *ngFor="let option of defaultOption" [nzLabel]="option" [nzValue]="option" nzHide></nz-option>
    </nz-select>
    <br />
    <br />
    <nz-select style="width: 100%" [(ngModel)]="selectedValue">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option" [nzValue]="option"></nz-option>
      <nz-option nzLabel="Default Value" nzValue="Default" nzHide></nz-option>
    </nz-select>
  `
})
export class NzDemoSelectDefaultValueComponent {
  listOfOption = ['Option 01', 'Option 02'];
  listOfSelectedValue = ['Default 01', 'Default 02'];
  defaultOption = [...this.listOfSelectedValue];

  selectedValue = 'Default';
}
