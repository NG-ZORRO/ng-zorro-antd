import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
  selector: 'nz-demo-breadcrumb-basic',
  imports: [NzBreadCrumbModule],
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>Home</nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a>Application List</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>An Application</nz-breadcrumb-item>
    </nz-breadcrumb>
  `
})
export class NzDemoBreadcrumbBasicComponent {}
