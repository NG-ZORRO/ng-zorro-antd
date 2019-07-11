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
  constructor(public direction: NzResizeDirection, public mouseEvent: MouseEvent) {}
}

@Component({
  selector: 'nz-resize-handle, [nz-resize-handle]',
  templateUrl: './nz-resize-handle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"nz-resizable-handle nz-resizable-handle-" + nzDirection',
    '[class.nz-resizable-handle-box-hover]': 'entered',
    '(mousedown)': 'onMousedown($event)'
  }
})
export class NzResizeHandleComponent implements OnInit, OnDestroy {
  @Input() nzDirection: NzResizeDirection = 'bottomRight';
  @Output() readonly nzMouseDown = new EventEmitter<NzResizeHandleMouseDownEvent>();
  entered = false;

  constructor(private nzResizableService: NzResizableService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.nzResizableService.mouseEntered$.asObservable().subscribe(entered => {
      this.entered = entered;
      this.cdr.markForCheck();
    });
  }

  onMousedown($event: MouseEvent): void {
    this.nzResizableService.handleMouseDown$.next(new NzResizeHandleMouseDownEvent(this.nzDirection, $event));
  }

  ngOnDestroy(): void {}
}
