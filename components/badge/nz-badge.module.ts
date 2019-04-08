import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from 'ng-zorro-antd/core';

import { NzBadgeComponent } from './nz-badge.component';

@NgModule({
  declarations: [NzBadgeComponent],
  exports: [NzBadgeComponent],
  imports: [CommonModule, ObserversModule, NzAddOnModule]
})
export class NzBadgeModule {}
