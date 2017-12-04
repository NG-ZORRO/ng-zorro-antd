import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-breadcrumb-icon',
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>
        <i class="anticon anticon-home"></i>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a href=""><i class="anticon anticon-user"></i><span>Application List</span></a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a href="">Application</a>
      </nz-breadcrumb-item>
    </nz-breadcrumb>`,
  styles  : []
})
export class NzDemoBreadCrumbIconComponent { }
