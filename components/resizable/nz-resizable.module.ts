/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzResizableDirective } from './nz-resizable.directive';
import { NzResizeHandleComponent } from './nz-resize-handle.component';
import { NzResizeHandlesComponent } from './nz-resize-handles.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent],
  exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent]
})
export class NzResizableModule {}
