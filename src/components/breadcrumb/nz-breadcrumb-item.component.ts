import {
  Component,
} from '@angular/core';
import { NzBreadCrumbComponent } from './nz-breadcrumb.component';

@Component({
  selector: 'nz-breadcrumb-item',
  template: `
    <span class="ant-breadcrumb-link">
      <ng-content></ng-content>
    </span>
    <span class="ant-breadcrumb-separator">{{ nzBreadCrumbComponent?.nzSeparator }}</span>`
})
export class NzBreadCrumbItemComponent {
  constructor(public nzBreadCrumbComponent: NzBreadCrumbComponent) {
  }

}
