/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzPopoverComponent, NzPopoverDirective } from './popover';

@NgModule({
  exports: [NzPopoverDirective, NzPopoverComponent],
  declarations: [NzPopoverDirective, NzPopoverComponent],
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    NzOutletModule,
    NzOverlayModule,
    NzNoAnimationModule,
    NzToolTipModule
  ]
})
export class NzPopoverModule {}
