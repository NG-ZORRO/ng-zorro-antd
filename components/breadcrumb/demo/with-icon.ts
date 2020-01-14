import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-breadcrumb-with-icon',
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>
        <i nz-icon nzType="home"></i>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a><i nz-icon nzType="user"></i><span>Application List</span></a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        Application
      </nz-breadcrumb-item>
    </nz-breadcrumb>
  `
})
export class NzDemoBreadcrumbWithIconComponent {}
