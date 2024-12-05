import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

function alphabet(): string[] {
  const children: string[] = [];
  for (let i = 10; i < 36; i++) {
    children.push(i.toString(36) + i);
  }
  return children;
}

@Component({
  selector: 'nz-demo-select-max-count',
  imports: [FormsModule, NzSelectModule],
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
export class NzDemoSelectMaxCountComponent {
  readonly listOfOption: string[] = alphabet();
  listOfSelectedValue = ['a10', 'c12'];
}
