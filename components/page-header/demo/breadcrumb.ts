import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-breadcrumb',
  template: `
    <nz-page-header nzBackIcon nzTitle="Page Title">
      <nz-breadcrumb nz-page-header-breadcrumb>
        <nz-breadcrumb-item>First-level</nz-breadcrumb-item>
        <nz-breadcrumb-item>
          <a>Second-level</a>
        </nz-breadcrumb-item>
        <nz-breadcrumb-item>Third-level</nz-breadcrumb-item>
      </nz-breadcrumb>
    </nz-page-header>

  `,
  styles  : [ `
    nz-page-header {
      border: 1px solid rgb(235, 237, 240);
    }
  ` ]
})
export class NzDemoPageHeaderBreadcrumbComponent {
}
