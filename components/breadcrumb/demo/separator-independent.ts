import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
  selector: 'nz-demo-breadcrumb-separator-independent',
  imports: [NzBreadCrumbModule],
  template: `
    <nz-breadcrumb [nzSeparator]="null">
      <nz-breadcrumb-item>Location</nz-breadcrumb-item>
      <nz-breadcrumb-separator>:</nz-breadcrumb-separator>
      <nz-breadcrumb-item>
        <a>Application Center</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-separator>/</nz-breadcrumb-separator>
      <nz-breadcrumb-item>Application List</nz-breadcrumb-item>
      <nz-breadcrumb-separator>/</nz-breadcrumb-separator>
      <nz-breadcrumb-item>An Application</nz-breadcrumb-item>
    </nz-breadcrumb>
  `
})
export class NzDemoBreadcrumbSeparatorIndependentComponent {}
