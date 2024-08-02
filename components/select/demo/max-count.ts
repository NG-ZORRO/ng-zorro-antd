import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-max-count',
  template: `
    <nz-select
      [nzMaxMultipleCount]="3"
      nzMode="multiple"
      nzPlaceHolder="Please select"
      nzAllowClear
      [nzShowArrow]="true"
      [(ngModel)]="listOfSelectedValue"
    >
      @for (item of listOfOption; track item) {
        <nz-option [nzLabel]="item" [nzValue]="item"></nz-option>
      }
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
export class NzDemoSelectMaxCountComponent implements OnInit {
  listOfOption: string[] = [];
  listOfSelectedValue = ['a10', 'c12'];

  ngOnInit(): void {
    const children: string[] = [];
    for (let i = 10; i < 36; i++) {
      children.push(`${i.toString(36)}${i}`);
    }
    this.listOfOption = children;
  }
}
