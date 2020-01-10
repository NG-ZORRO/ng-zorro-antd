import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-breadcrumb-auto',
  template: `
    <nz-breadcrumb [nzAutoGenerate]="true">
      Please refer to StackBlitz demo at https://stackblitz.com/edit/ng-zorro-breadcrumb-auto
    </nz-breadcrumb>
  `
})
export class NzDemoBreadcrumbAutoComponent {}
