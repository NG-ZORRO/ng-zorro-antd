/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzPopconfirmComponent, NzPopconfirmDirective } from './popconfirm';

@NgModule({
  declarations: [NzPopconfirmComponent, NzPopconfirmDirective],
  exports: [NzPopconfirmComponent, NzPopconfirmDirective],
  imports: [
    BidiModule,
    CommonModule,
    NzButtonModule,
    OverlayModule,
    NzI18nModule,
    NzIconModule,
    NzOutletModule,
    NzOverlayModule,
    NzNoAnimationModule,
    NzToolTipModule,
    A11yModule
  ]
})
export class NzPopconfirmModule {}
