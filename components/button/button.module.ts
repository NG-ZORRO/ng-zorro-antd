/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { ɵNzTransitionPatchModule as NzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

import { NzButtonGroupComponent } from './button-group.component';
import { NzButtonComponent } from './button.component';

@NgModule({
  imports: [NzButtonComponent, NzButtonGroupComponent],
  exports: [NzButtonComponent, NzButtonGroupComponent, NzTransitionPatchModule, NzWaveModule]
})
export class NzButtonModule {}
