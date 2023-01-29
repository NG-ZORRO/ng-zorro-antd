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
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { NzTreeSelectComponent } from './tree-select.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    FormsModule,
    NzSelectModule,
    NzTreeModule,
    NzIconModule,
    NzEmptyModule,
    NzOverlayModule,
    NzNoAnimationModule,
    NzFormPatchModule
  ],
  declarations: [NzTreeSelectComponent],
  exports: [NzTreeSelectComponent]
})
export class NzTreeSelectModule {}
