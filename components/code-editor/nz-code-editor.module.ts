/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzCodeEditorComponent } from './nz-code-editor.component';

@NgModule({
  declarations: [NzCodeEditorComponent],
  imports: [CommonModule, NzIconModule, NzSpinModule],
  exports: [NzCodeEditorComponent]
})
export class NzCodeEditorModule {}
