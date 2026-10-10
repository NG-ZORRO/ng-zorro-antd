import { Component, signal } from '@angular/core';
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
  selector: 'nz-demo-select-responsive',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      [nzOptions]="options"
      nzMaxTagCount="responsive"
      nzMode="multiple"
      nzAllowClear
      nzPlaceHolder="Please select"
      [(ngModel)]="value"
    />
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectResponsiveComponent {
  readonly options = alphabet().map(item => ({ label: item, value: item }));
  readonly value = signal(['a10', 'b11', 'c12', 'd13', 'e14', 'f15', 'g16', 'h17']);
}
