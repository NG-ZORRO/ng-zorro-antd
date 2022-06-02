/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzColPropertyDirective } from './col-property.directive';
import { NzColDirective } from './col.directive';
import { NzRowDirective } from './row.directive';

@NgModule({
  declarations: [NzColPropertyDirective, NzColDirective, NzRowDirective],
  exports: [NzColPropertyDirective, NzColDirective, NzRowDirective],
  imports: [BidiModule, CommonModule, LayoutModule, PlatformModule]
})
export class NzGridModule {}
