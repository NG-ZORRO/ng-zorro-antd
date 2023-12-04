/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzResizableDirective } from './resizable.directive';
import { NzResizeHandleComponent } from './resize-handle.component';
import { NzResizeHandlesComponent } from './resize-handles.component';

@NgModule({
  imports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent],
  exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent]
})
export class NzResizableModule {}
