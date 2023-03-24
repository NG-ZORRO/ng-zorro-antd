/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzFloatButtonContentComponent } from './float-button-content.component';
import { NzFloatButtonGroupComponent } from './float-button-group.component';
import { NzFloatButtonTopComponent } from './float-button-top.component';
import { NzFloatButtonComponent } from './float-button.component';

@NgModule({
  declarations: [
    NzFloatButtonComponent,
    NzFloatButtonGroupComponent,
    NzFloatButtonContentComponent,
    NzFloatButtonTopComponent
  ],
  exports: [
    NzFloatButtonComponent,
    NzFloatButtonGroupComponent,
    NzFloatButtonTopComponent,
    NzFloatButtonContentComponent
  ],
  imports: [BidiModule, CommonModule, NzIconModule, NzButtonModule, PlatformModule]
})
export class NzFloatButtonModule {}
