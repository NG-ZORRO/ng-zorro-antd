import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-breadcrumb-auto',
  template: `
    <nz-breadcrumb [nzAutoGenerate]="true">
      Please refer to StackBlitz demo.
    </nz-breadcrumb>
  `
})
export class NzDemoBreadcrumbAutoComponent {}
