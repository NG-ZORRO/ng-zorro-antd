import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzBreadCrumbItemComponent } from './nz-breadcrumb-item.component';
import { NzBreadCrumbComponent } from './nz-breadcrumb.component';

@NgModule({
  imports     : [ CommonModule ],
  declarations: [ NzBreadCrumbComponent, NzBreadCrumbItemComponent ],
  exports     : [ NzBreadCrumbComponent, NzBreadCrumbItemComponent ]
})
export class NzBreadCrumbModule {}
