/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzFloatButtonContentComponent } from './float-button-content.component';
import { NzFloatButtonGroupComponent } from './float-button-group.component';
import { NzFloatButtonTopComponent } from './float-button-top.component';
import { NzFloatButtonComponent } from './float-button.component';

@NgModule({
  exports: [
    NzFloatButtonComponent,
    NzFloatButtonGroupComponent,
    NzFloatButtonTopComponent,
    NzFloatButtonContentComponent
  ],
  imports: [
    NzFloatButtonComponent,
    NzFloatButtonGroupComponent,
    NzFloatButtonTopComponent,
    NzFloatButtonContentComponent
  ]
})
export class NzFloatButtonModule {}
