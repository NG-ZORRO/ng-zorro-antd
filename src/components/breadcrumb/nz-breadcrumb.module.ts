import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzBreadCrumbComponent } from './nz-breadcrumb.component';
import { NzBreadCrumbItemComponent } from './nz-breadcrumb-item.component';

@NgModule({
  imports     : [ CommonModule ],
  declarations: [ NzBreadCrumbComponent, NzBreadCrumbItemComponent ],
  exports     : [ NzBreadCrumbComponent, NzBreadCrumbItemComponent ]
})
export class NzBreadCrumbModule {
}
