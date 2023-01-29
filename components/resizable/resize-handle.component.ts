/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';

import { NzResizableService } from './resizable.service';

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

const passiveEventListenerOptions = <AddEventListenerOptions>normalizePassiveListenerOptions({ passive: true });

@Component({
  selector: 'nz-resize-handle, [nz-resize-handle]',
  exportAs: 'nzResizeHandle',
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'nz-resizable-handle',
    '[class.nz-resizable-handle-top]': `nzDirection === 'top'`,
    '[class.nz-resizable-handle-right]': `nzDirection === 'right'`,
    '[class.nz-resizable-handle-bottom]': `nzDirection === 'bottom'`,
    '[class.nz-resizable-handle-left]': `nzDirection === 'left'`,
    '[class.nz-resizable-handle-topRight]': `nzDirection === 'topRight'`,
    '[class.nz-resizable-handle-bottomRight]': `nzDirection === 'bottomRight'`,
    '[class.nz-resizable-handle-bottomLeft]': `nzDirection === 'bottomLeft'`,
    '[class.nz-resizable-handle-topLeft]': `nzDirection === 'topLeft'`
  },
  providers: [NzDestroyService]
})
export class NzResizeHandleComponent implements OnInit {
  @Input() nzDirection: NzResizeDirection = 'bottomRight';
  @Output() readonly nzMouseDown = new EventEmitter<NzResizeHandleMouseDownEvent>();

  constructor(
    private ngZone: NgZone,
    private nzResizableService: NzResizableService,
    private renderer: Renderer2,
    private host: ElementRef<HTMLElement>,
    private destroy$: NzDestroyService
  ) {}

  ngOnInit(): void {
    this.nzResizableService.mouseEnteredOutsideAngular$.pipe(takeUntil(this.destroy$)).subscribe(entered => {
      if (entered) {
        this.renderer.addClass(this.host.nativeElement, 'nz-resizable-handle-box-hover');
      } else {
        this.renderer.removeClass(this.host.nativeElement, 'nz-resizable-handle-box-hover');
      }
    });

    this.ngZone.runOutsideAngular(() => {
      // Note: since Chrome 56 defaults document level `touchstart` listener to passive.
      // The element `touchstart` listener is not passive by default
      // We never call `preventDefault()` on it, so we're safe making it passive too.
      merge(
        fromEvent<MouseEvent>(this.host.nativeElement, 'mousedown', passiveEventListenerOptions),
        fromEvent<TouchEvent>(this.host.nativeElement, 'touchstart', passiveEventListenerOptions)
      )
        .pipe(takeUntil(this.destroy$))
        .subscribe((event: MouseEvent | TouchEvent) => {
          this.nzResizableService.handleMouseDownOutsideAngular$.next(
            new NzResizeHandleMouseDownEvent(this.nzDirection, event)
          );
        });
    });
  }
}
