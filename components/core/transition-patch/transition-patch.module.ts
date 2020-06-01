/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { NzTransitionPatchDirective } from './transition-patch.directive';

@NgModule({
  imports: [PlatformModule],
  exports: [NzTransitionPatchDirective],
  declarations: [NzTransitionPatchDirective]
})
export class NzTransitionPatchModule {}
