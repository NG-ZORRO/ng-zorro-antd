import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-breadcrumb-dropdown',
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>
        Ant Design
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a>Component</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item [nzOverlay]="menu">
        <a href>An Application</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        Button
      </nz-breadcrumb-item>
    </nz-breadcrumb>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu nzSelectable>
        <li nz-menu-item><a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">General</a></li>
        <li nz-menu-item><a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Layout</a></li>
        <li nz-menu-item><a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">Navigation</a></li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: []
})
export class NzDemoBreadcrumbDropdownComponent {}
