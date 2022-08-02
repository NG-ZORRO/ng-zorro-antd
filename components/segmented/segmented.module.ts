/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzSegmentedComponent } from './segmented.component';

@NgModule({
  exports: [NzSegmentedComponent],
  declarations: [NzSegmentedComponent],
  imports: [BidiModule, CommonModule, FormsModule, NzI18nModule, NzIconModule, NzOutletModule]
})
export class NzSegmentedModule {}
