/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzResizableService } from './nz-resizable.service';

export type NzResizeDirection =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft';

export class NzResizeHandleMouseDownEvent {
  constructor(public direction: NzResizeDirection, public mouseEvent: MouseEvent | TouchEvent) {}
}

@Component({
  selector: 'nz-resize-handle, [nz-resize-handle]',
  exportAs: 'nzResizeHandle',
  templateUrl: './nz-resize-handle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"nz-resizable-handle nz-resizable-handle-" + nzDirection',
    '[class.nz-resizable-handle-box-hover]': 'entered',
    '(mousedown)': 'onMousedown($event)',
    '(touchstart)': 'onMousedown($event)'
  }
})
export class NzResizeHandleComponent implements OnInit, OnDestroy {
  @Input() nzDirection: NzResizeDirection = 'bottomRight';
  @Output() readonly nzMouseDown = new EventEmitter<NzResizeHandleMouseDownEvent>();

  entered = false;
  private destroy$ = new Subject<void>();

  constructor(private nzResizableService: NzResizableService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.nzResizableService.mouseEntered$.pipe(takeUntil(this.destroy$)).subscribe(entered => {
      this.entered = entered;
      this.cdr.markForCheck();
    });
  }

  onMousedown(event: MouseEvent | TouchEvent): void {
    this.nzResizableService.handleMouseDown$.next(new NzResizeHandleMouseDownEvent(this.nzDirection, event));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
