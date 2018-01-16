import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-size',
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button [nzValue]="'large'"><span>Large</span></label>
      <label nz-radio-button [nzValue]="'default'"><span>Default</span></label>
      <label nz-radio-button [nzValue]="'small'"><span>Small</span></label>
    </nz-radio-group>
    <br>
    <br>
    <nz-select style="width: 200px;" [(ngModel)]="single" [nzSize]="size">
      <nz-option
        *ngFor="let option of options"
        [nzLabel]="option.label"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
    <br>
    <br>
    <nz-select style="width: 200px;" [(ngModel)]="single" [nzSize]="size" nzShowSearch>
      <nz-option
        *ngFor="let option of options"
        [nzLabel]="option.label"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
    <br>
    <br>
    <nz-select style="width: 100%" [(ngModel)]="multiple" [nzSize]="size" [nzMode]="'multiple'">
      <nz-option
        *ngFor="let option of options"
        [nzLabel]="option.label"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
    <br>
    <br>
    <nz-select style="width: 100%" [(ngModel)]="tag" [nzSize]="size" [nzMode]="'tags'">
      <nz-option
        *ngFor="let option of options"
        [nzLabel]="option.label"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
  `,
  styles  : []
})
export class NzDemoSelectSizeComponent implements OnInit {
  size = 'default';
  options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ];
  single = 'lucy';
  multiple = [ 'lucy' ];
  tag = [ 'lucy' ];

  constructor() {
  }

  ngOnInit() {
  }
}

