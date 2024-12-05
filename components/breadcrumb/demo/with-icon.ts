import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-breadcrumb-with-icon',
  imports: [NzBreadCrumbModule, NzIconModule],
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>
        <span nz-icon nzType="home"></span>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a>
          <span nz-icon nzType="user"></span>
          <span>Application List</span>
        </a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>Application</nz-breadcrumb-item>
    </nz-breadcrumb>
  `
})
export class NzDemoBreadcrumbWithIconComponent {}
