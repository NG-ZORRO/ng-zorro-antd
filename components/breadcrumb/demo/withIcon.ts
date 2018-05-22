import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-breadcrumb-withIcon',
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>
        <i class="anticon anticon-home"></i>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a><i class="anticon anticon-user"></i><span>Application List</span></a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        Application
      </nz-breadcrumb-item>
    </nz-breadcrumb>`,
  styles  : []
})
export class NzDemoBreadcrumbWithIconComponent { }
