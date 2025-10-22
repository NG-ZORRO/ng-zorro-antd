/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzBackTopComponent } from './back-top.component';

/**
 * @deprecated Will be removed in v21. It is recommended to use `<nz-float-button-top>` instead.
 */
@NgModule({
  exports: [NzBackTopComponent],
  imports: [NzBackTopComponent]
})
export class NzBackTopModule {}
