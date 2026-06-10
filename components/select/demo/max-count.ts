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
  selector: 'nz-demo-select-max-count',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      [nzOptions]="options"
      [nzMaxMultipleCount]="3"
      nzMode="multiple"
      nzPlaceHolder="Please select"
      nzAllowClear
      [(ngModel)]="value"
    />
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectMaxCountComponent {
  readonly options = alphabet().map(item => ({ label: item, value: item }));
  readonly value = signal(['a10', 'c12']);
}
