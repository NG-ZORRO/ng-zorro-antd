import { Component } from '@angular/core';

import { NzCheckListModule, NzItemProps } from 'ng-zorro-antd/check-list';

@Component({
  selector: 'nz-demo-check-list-basic',
  imports: [NzCheckListModule],
  template: `<nz-check-list [nzItems]="nzItems" [nzIndex]="index"></nz-check-list>`
})
export class NzDemoCheckListBasicComponent {
  index = 1;
  readonly nzItems: NzItemProps[] = [
    {
      description: 'step 1',
      onClick: () => this.index++
    },
    {
      description: 'step 2',
      onClick: () => this.index++
    },
    {
      description: 'step 3',
      onClick: () => this.index++
    },
    {
      description: 'step 4',
      onClick: () => this.index++
    }
  ];
}
