/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core';

import { NzResizeMode, NzResizePosition } from './nz-resize.definitions';

export function ensureNumInRange(num: number, range: [number, number]): number {
  if (num > range[1]) {
    return range[1];
  }
  if (num < range[0]) {
    return range[0];
  }
  return num;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-resize',
  templateUrl: './nz-resize.component.html'
})
export class NzResizeComponent implements OnInit, OnChanges {
  @ViewChild('trigger', { static: false }) trigger: ElementRef<HTMLDivElement>;

  @Input() nzBaseElement: HTMLElement;
  @Input() @InputBoolean() nzShowBorder = false;
  @Input() @InputBoolean() nzHidden = false;
  @Input() nzLeft = 0;
  @Input() nzTop = 0;
  @Input() nzMin: number = 0;
  @Input() nzMax: number = 300;
  @Input() nzMode: NzResizeMode = 'vertical';

  /**
   * If set to true, the resize would show a dotted line following users' pointer while dragging,
   * and only emit event when dragging is done.
   */
  @Input() @InputBoolean() nzLazy = false;

  @Output() readonly nzResizeStart = new EventEmitter<NzResizePosition>();
  @Output() readonly nzResizeChange = new EventEmitter<NzResizePosition>();
  @Output() readonly nzResizeEnd = new EventEmitter<NzResizePosition>();

  get currentPosition(): NzResizePosition {
    return {
      left: this.left,
      top: this.top
    };
  }

  left?: number;
  top?: number;
  canMove = true;
  defaultValue: number = 0;
  isDragging = false;

  ngOnInit(): void {
    this.defaultValue = this.nzMode === 'vertical' ? this.nzTop : this.nzLeft;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzLeft) {
      this.left = changes.nzLeft.currentValue;
    }

    if (changes.nzTop) {
      this.top = changes.nzTop.currentValue;
    }
  }

  reset(): void {
    this.nzResizeChange.emit(this.nzMode === 'vertical' ? { left: this.defaultValue } : { top: this.defaultValue });
  }

  startDragging(): void {
    if (this.nzHidden) {
      return;
    }

    this.isDragging = true;
    this.nzResizeStart.emit(this.currentPosition);
  }

  @HostListener('document:mousemove', ['$event'])
  dragging(e: MouseEvent): void {
    if (!this.isDragging) {
      return;
    } else {
      e.preventDefault();
      if (this.nzMode === 'horizontal') {
        this.top = this.getResizeTop(e);
      } else {
        this.left = this.getResizeLeft(e);
      }
      if (!this.nzLazy) {
        this.nzResizeChange.next(this.currentPosition);
      }
    }
  }

  @HostListener('document:mouseup')
  stopDragging(): void {
    // When user dragging the handler outside of limits, `e.target` wouldn't be the handler. So here we shouldn't
    // check whether the event's target is the handler.
    if (this.isDragging) {
      this.isDragging = false;
      this.nzResizeChange.emit(this.currentPosition);
      this.nzResizeEnd.emit(this.currentPosition);
    }
  }

  private getResizeLeft(e: MouseEvent): number {
    let elem = this.nzBaseElement;

    const getOffsetLeft = () => {
      let _offsetLeft = 0;
      do {
        if (!isNaN(elem.offsetLeft)) {
          _offsetLeft += elem.offsetLeft;
        }
        elem = elem.offsetParent as HTMLElement;
      } while (elem);
      return _offsetLeft;
    };

    const offsetLeft = getOffsetLeft();
    const newLeft = e.pageX - offsetLeft;
    return ensureNumInRange(newLeft, [this.nzMin, this.nzMax]);
  }

  private getResizeTop(e: MouseEvent): number {
    let elem = this.nzBaseElement;

    const getOffsetTop = () => {
      let _offsetTop = 0;
      do {
        if (!isNaN(elem.offsetTop)) {
          _offsetTop += elem.offsetTop;
        }
        elem = elem.offsetParent as HTMLElement;
      } while (elem);
      return _offsetTop;
    };

    const offsetTop = getOffsetTop();
    const newTop = e.pageY - offsetTop;
    return ensureNumInRange(newTop, [this.nzMin, this.nzMax]);
  }
}
