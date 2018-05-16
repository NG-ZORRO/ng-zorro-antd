import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-size',
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button nzValue="large"><span>Large</span></label>
      <label nz-radio-button nzValue="default"><span>Default</span></label>
      <label nz-radio-button nzValue="small"><span>Small</span></label>
    </nz-radio-group>
    <br><br>
    <nz-select style="width: 200px;" [(ngModel)]="singleValue" [nzSize]="size">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
    </nz-select>
    <br><br>
    <nz-select style="width: 200px;" [(ngModel)]="singleValue" [nzSize]="size" nzShowSearch>
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
    </nz-select>
    <br><br>
    <nz-select style="width: 100%" [(ngModel)]="multipleValue" [nzSize]="size" nzMode="multiple" nzPlaceholder="Please select">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
    </nz-select>
    <br><br>
    <nz-select style="width: 100%" [(ngModel)]="tagValue" [nzSize]="size" nzMode="tags" nzPlaceholder="Please select">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
    </nz-select>
  `
})
export class NzDemoSelectSizeComponent implements OnInit {
  listOfOption = [];
  size = 'default';
  singleValue = 'a10';
  multipleValue = [ 'a10', 'c12' ];
  tagValue = [ 'a10', 'c12', 'tag' ];

  ngOnInit(): void {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
}
