import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from '../core/addon/addon.module';

import { NzBreadCrumbItemComponent } from './nz-breadcrumb-item.component';
import { NzBreadCrumbComponent } from './nz-breadcrumb.component';

@NgModule({
  imports     : [ CommonModule, NzAddOnModule ],
  declarations: [ NzBreadCrumbComponent, NzBreadCrumbItemComponent ],
  exports     : [ NzBreadCrumbComponent, NzBreadCrumbItemComponent ]
})
export class NzBreadCrumbModule {}
