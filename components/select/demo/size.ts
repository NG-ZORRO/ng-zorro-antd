import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';

function alphabet(): string[] {
  const children: string[] = [];
  for (let i = 10; i < 36; i++) {
    children.push(i.toString(36) + i);
  }
  return children;
}

@Component({
  selector: 'nz-demo-select-size',
  imports: [FormsModule, NzSelectModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button nzValue="large">Large</label>
      <label nz-radio-button nzValue="default">Default</label>
      <label nz-radio-button nzValue="small">Small</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-select [(ngModel)]="singleValue" [nzSize]="size">
      @for (option of listOfOption; track option) {
        <nz-option [nzLabel]="option" [nzValue]="option" />
      }
    </nz-select>
    <br />
    <br />
    <nz-select [(ngModel)]="singleValue" [nzSize]="size" nzShowSearch>
      @for (option of listOfOption; track option) {
        <nz-option [nzLabel]="option" [nzValue]="option" />
      }
    </nz-select>
    <br />
    <br />
    <nz-select [(ngModel)]="multipleValue" [nzSize]="size" nzMode="multiple" nzPlaceHolder="Please select">
      @for (option of listOfOption; track option) {
        <nz-option [nzLabel]="option" [nzValue]="option" />
      }
    </nz-select>
    <br />
    <br />
    <nz-select [(ngModel)]="tagValue" [nzSize]="size" nzMode="tags" nzPlaceHolder="Please select">
      @for (option of listOfOption; track option) {
        <nz-option [nzLabel]="option" [nzValue]="option" />
      }
    </nz-select>
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectSizeComponent {
  readonly listOfOption: string[] = alphabet();
  size: NzSelectSizeType = 'default';
  singleValue = 'a10';
  multipleValue = ['a10', 'c12'];
  tagValue = ['a10', 'c12', 'tag'];
}
