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
  selector: 'nz-demo-select-multiple',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      [nzOptions]="options"
      [nzMaxTagCount]="3"
      [nzMaxTagPlaceholder]="tagPlaceHolder"
      nzMode="multiple"
      nzAllowClear
      nzPlaceHolder="Please select"
      [(ngModel)]="value"
    />
    <ng-template #tagPlaceHolder let-selectedList>and {{ selectedList.length }} more selected</ng-template>
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectMultipleComponent {
  readonly options = alphabet().map(item => ({ label: item, value: item }));
  readonly value = signal(['a10', 'c12']);
}
