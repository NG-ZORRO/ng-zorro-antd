/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzBackTopComponent } from './back-top.component';

@NgModule({
  declarations: [NzBackTopComponent],
  exports: [NzBackTopComponent],
  imports: [BidiModule, CommonModule, PlatformModule, NzIconModule]
})
export class NzBackTopModule {}
