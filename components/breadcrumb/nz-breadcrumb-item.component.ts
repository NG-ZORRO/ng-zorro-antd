import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { NzBreadCrumbComponent } from './nz-breadcrumb.component';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-breadcrumb-item',
  preserveWhitespaces: false,
  templateUrl        : 'nz-breadcrumb-item.component.html',
  styles             : [ `
    nz-breadcrumb-item:last-child {
      color: rgba(0, 0, 0, 0.65);
    }

    nz-breadcrumb-item:last-child .ant-breadcrumb-separator {
      display: none;
    }
  ` ]
})
export class NzBreadCrumbItemComponent {
  constructor(public nzBreadCrumbComponent: NzBreadCrumbComponent) { }
}
