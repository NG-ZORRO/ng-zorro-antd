import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-breadcrumb',
  template: `
    <nz-page-header>
      <nz-page-header-title>Page Title</nz-page-header-title>
      <nz-breadcrumb nz-page-header-breadcrumb>
        <nz-breadcrumb-item>
          Home
        </nz-breadcrumb-item>
        <nz-breadcrumb-item>
          <a>Application List</a>
        </nz-breadcrumb-item>
        <nz-breadcrumb-item>
          An Application
        </nz-breadcrumb-item>
      </nz-breadcrumb>
    </nz-page-header>

  `,
  styles  : [`
    nz-page-header {
      border: 1px solid rgb(235, 237, 240);
    }
  `]
})
export class NzDemoPageHeaderBreadcrumbComponent {
}
