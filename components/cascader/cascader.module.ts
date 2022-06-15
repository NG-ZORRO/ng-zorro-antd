/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFormPatchModule } from 'ng-zorro-antd/core/form';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzCascaderOptionComponent } from './cascader-li.component';
import { NzCascaderComponent } from './cascader.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    OverlayModule,
    NzOutletModule,
    NzEmptyModule,
    NzHighlightModule,
    NzIconModule,
    NzInputModule,
    NzNoAnimationModule,
    NzOverlayModule,
    NzFormPatchModule
  ],
  declarations: [NzCascaderComponent, NzCascaderOptionComponent],
  exports: [NzCascaderComponent]
})
export class NzCascaderModule {}
