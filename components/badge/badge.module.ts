/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

import { NzBadgeComponent } from './badge.component';

@NgModule({
  declarations: [NzBadgeComponent],
  exports: [NzBadgeComponent],
  imports: [CommonModule, ObserversModule, NzOutletModule]
})
export class NzBadgeModule {}
