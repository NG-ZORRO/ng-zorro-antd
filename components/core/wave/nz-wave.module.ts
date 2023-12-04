/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NZ_WAVE_GLOBAL_DEFAULT_CONFIG, NzWaveDirective, provideNzWave } from './nz-wave.directive';

@NgModule({
  imports: [NzWaveDirective],
  exports: [NzWaveDirective],
  providers: [provideNzWave(NZ_WAVE_GLOBAL_DEFAULT_CONFIG)]
})
export class NzWaveModule {}
