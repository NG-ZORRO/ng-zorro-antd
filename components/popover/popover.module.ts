/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzPopoverComponent, NzPopoverDirective } from './popover';

@NgModule({
  imports: [NzPopoverDirective, NzPopoverComponent],
  exports: [NzPopoverDirective, NzPopoverComponent]
})
export class NzPopoverModule {}
