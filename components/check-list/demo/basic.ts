import { Component } from '@angular/core';

import { NzCheckListModule, NzItemProps } from 'ng-zorro-antd/check-list';

@Component({
  selector: 'nz-demo-check-list-basic',
  imports: [NzCheckListModule],
  template: `<nz-check-list [nzItems]="nzItems" [nzIndex]="index" />`
})
export class NzDemoCheckListBasicComponent {
  index = 2;
  readonly nzItems: NzItemProps[] = [
    {
      description: 'step 1',
      checked: true,
      onClick: (item: NzItemProps) => {
        this.index++;
        item.checked = true;
      }
    },
    {
      description: 'step 2',
      onClick: (item: NzItemProps) => {
        this.index++;
        item.checked = true;
      }
    },
    {
      description: 'step 3',
      onClick: (item: NzItemProps) => {
        this.index++;
        item.checked = true;
      }
    },
    {
      description: 'step 4',
      onClick: (item: NzItemProps) => {
        this.index++;
        item.checked = true;
      }
    }
  ];
}
