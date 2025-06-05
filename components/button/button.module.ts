/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { ɵNzTransitionPatchModule as NzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

import { NzButtonComponent } from './button.component';

@NgModule({
  imports: [NzButtonComponent],
  exports: [NzButtonComponent, NzTransitionPatchModule, NzWaveModule]
})
export class NzButtonModule {}
