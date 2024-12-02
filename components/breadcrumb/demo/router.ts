import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
  selector: 'nz-demo-breadcrumb-router',
  imports: [RouterLink, NzBreadCrumbModule],
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>
        <a [routerLink]="['../../']">Home</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>Breadcrumb</nz-breadcrumb-item>
    </nz-breadcrumb>
  `
})
export class NzDemoBreadcrumbRouterComponent {}
