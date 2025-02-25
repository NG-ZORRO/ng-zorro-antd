import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@Component({
  selector: 'nz-demo-page-header-breadcrumb',
  imports: [NzBreadCrumbModule, NzPageHeaderModule],
  template: `
    <nz-page-header nzTitle="Title" nzSubtitle="This is a subtitle">
      <nz-breadcrumb nz-page-header-breadcrumb>
        <nz-breadcrumb-item>First-level Menu</nz-breadcrumb-item>
        <nz-breadcrumb-item>
          <a>Second-level Menu</a>
        </nz-breadcrumb-item>
        <nz-breadcrumb-item>Third-level Menu</nz-breadcrumb-item>
      </nz-breadcrumb>
    </nz-page-header>
  `
})
export class NzDemoPageHeaderBreadcrumbComponent {}
