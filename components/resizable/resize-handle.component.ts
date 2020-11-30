/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzResizableService } from './resizable.service';

export type NzResizeDirection = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';

export class NzResizeHandleMouseDownEvent {
  constructor(public direction: NzResizeDirection, public mouseEvent: MouseEvent | TouchEvent) {}
}

@Component({
  selector: 'nz-resize-handle, [nz-resize-handle]',
  exportAs: 'nzResizeHandle',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nz-resizable-handle-top]': `nzDirection === 'top'`,
    '[class.nz-resizable-handle-right]': `nzDirection === 'right'`,
    '[class.nz-resizable-handle-bottom]': `nzDirection === 'bottom'`,
    '[class.nz-resizable-handle-left]': `nzDirection === 'left'`,
    '[class.nz-resizable-handle-topRight]': `nzDirection === 'topRight'`,
    '[class.nz-resizable-handle-bottomRight]': `nzDirection === 'bottomRight'`,
    '[class.nz-resizable-handle-bottomLeft]': `nzDirection === 'bottomLeft'`,
    '[class.nz-resizable-handle-topLeft]': `nzDirection === 'topLeft'`,
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

  constructor(private nzResizableService: NzResizableService, private cdr: ChangeDetectorRef, private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('nz-resizable-handle');
  }

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
