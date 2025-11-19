import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'nz-demo-breadcrumb-dropdown',
  imports: [NzBreadCrumbModule, NzDropdownModule],
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>Ant Design</nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a>Component</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item [nzOverlay]="menu">
        <a href>An Application</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>Button</nz-breadcrumb-item>
    </nz-breadcrumb>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu nzSelectable>
        <li nz-menu-item>General</li>
        <li nz-menu-item>Layout</li>
        <li nz-menu-item>Navigation</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzDemoBreadcrumbDropdownComponent {}
