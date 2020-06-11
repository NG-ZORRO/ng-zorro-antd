/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ɵNzTransitionPatchModule as NzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonGroupComponent } from './button-group.component';
import { NzButtonComponent } from './button.component';

@NgModule({
  declarations: [NzButtonComponent, NzButtonGroupComponent],
  exports: [NzButtonComponent, NzButtonGroupComponent, NzTransitionPatchModule, NzWaveModule],
  imports: [CommonModule, NzWaveModule, NzIconModule, NzTransitionPatchModule]
})
export class NzButtonModule {}
