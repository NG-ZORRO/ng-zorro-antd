import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-breadcrumb-separator',
  template: `
    <nz-breadcrumb [nzSeparator]="'>'">
      <nz-breadcrumb-item>
        Home
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a href="">Application Center</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a href="">Application List</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        An Application
      </nz-breadcrumb-item>
    </nz-breadcrumb>`,
  styles  : []
})
export class NzDemoBreadCrumbSeparatorComponent { }
