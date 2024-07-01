/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzTextCopyComponent } from './text-copy.component';
import { NzTextEditComponent } from './text-edit.component';
import { NzTypographyComponent } from './typography.component';

@NgModule({
  imports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent],
  exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent]
})
export class NzTypographyModule {}
