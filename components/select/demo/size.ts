import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-size',
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button nzValue="large"><span>Large</span></label>
      <label nz-radio-button nzValue="default"><span>Default</span></label>
      <label nz-radio-button nzValue="small"><span>Small</span></label>
    </nz-radio-group>
    <br /><br />
    <nz-select [(ngModel)]="singleValue" [nzSize]="size">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
    </nz-select>
    <br /><br />
    <nz-select [(ngModel)]="singleValue" [nzSize]="size" nzShowSearch>
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
    </nz-select>
    <br /><br />
    <nz-select [(ngModel)]="multipleValue" [nzSize]="size" nzMode="multiple" nzPlaceHolder="Please select">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
    </nz-select>
    <br /><br />
    <nz-select [(ngModel)]="tagValue" [nzSize]="size" nzMode="tags" nzPlaceHolder="Please select">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
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
export class NzDemoSelectSizeComponent implements OnInit {
  listOfOption: Array<{ label: string; value: string }> = [];
  size = 'default';
  singleValue = 'a10';
  multipleValue = ['a10', 'c12'];
  tagValue = ['a10', 'c12', 'tag'];

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
}
