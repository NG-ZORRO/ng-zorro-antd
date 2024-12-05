import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
  selector: 'nz-demo-breadcrumb-auto',
  imports: [NzBreadCrumbModule],
  template: `
    <nz-breadcrumb [nzAutoGenerate]="true">
      Please refer to StackBlitz demo at https://stackblitz.com/edit/ng-zorro-breadcrumb-auto
    </nz-breadcrumb>
  `
})
export class NzDemoBreadcrumbAutoComponent {}
