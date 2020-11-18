/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { NzConnectedOverlayDirective } from './nz-connected-overlay';
import { NzOutsideClickDirective } from './nz-outsite-click';

@NgModule({
  declarations: [NzConnectedOverlayDirective, NzOutsideClickDirective],
  exports: [NzConnectedOverlayDirective, NzOutsideClickDirective]
})
export class NzOverlayModule {}
