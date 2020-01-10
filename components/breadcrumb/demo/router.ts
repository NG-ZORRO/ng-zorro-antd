import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-breadcrumb-router',
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>
        <a [routerLink]="['../../']">Home</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        Breadcrumb
      </nz-breadcrumb-item>
    </nz-breadcrumb>
  `
})
export class NzDemoBreadcrumbRouterComponent {}
