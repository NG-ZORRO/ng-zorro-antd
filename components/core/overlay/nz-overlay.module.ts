/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { NzConnectedOverlayDirective } from './nz-connected-overlay';

@NgModule({
  declarations: [NzConnectedOverlayDirective],
  exports: [NzConnectedOverlayDirective]
})
export class NzOverlayModule {}
