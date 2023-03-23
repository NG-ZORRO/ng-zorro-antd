/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFloatButtonContentComponent } from 'ng-zorro-antd/float-button/float-button-content.component';
import { NzFloatButtonGroupComponent } from 'ng-zorro-antd/float-button/float-button-group.component';
import { NzFloatButtonTopComponent } from 'ng-zorro-antd/float-button/float-button-top.component';
import { NzFloatButtonComponent } from 'ng-zorro-antd/float-button/float-button.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
    NzFloatButtonContentComponent,
    NzFloatButtonTopComponent
  ],
  imports: [CommonModule, NzIconModule, NzButtonModule]
})
export class NzFloatButtonModule {}
