/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SCROLL_SERVICE_PROVIDER } from 'ng-zorro-antd/core/services';

import { NzBackTopComponent } from './back-top.component';

@NgModule({
  declarations: [NzBackTopComponent],
  exports: [NzBackTopComponent],
  imports: [CommonModule, PlatformModule],
  providers: [SCROLL_SERVICE_PROVIDER]
})
export class NzBackTopModule {}
