/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

import { NzResizeHandleMouseDownEvent } from './nz-resize-handle.component';

@Injectable()
export class NzResizableService implements OnDestroy {
  handleMouseDown$ = new Subject<NzResizeHandleMouseDownEvent>();
  documentMouseUp$ = new Subject<void>();
  mouseEntered$ = new Subject<boolean>();

  constructor() {}

  ngOnDestroy(): void {
    this.handleMouseDown$.complete();
    this.documentMouseUp$.complete();
    this.mouseEntered$.complete();
  }
}
