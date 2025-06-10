/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { inject, Injectable, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, finalize, map } from 'rxjs/operators';

import { getEventPosition, isTouchEvent } from 'ng-zorro-antd/core/util';

interface Point {
  x: number;
  y: number;
}

type Delta = Point;

interface HandlerItem {
  handler?(e: Event): void;

  teardown(): void;
}

function getPagePosition(event: MouseEvent | TouchEvent): Point {
  const e = getEventPosition(event);
  return {
    x: e.pageX,
    y: e.pageY
  };
}

/**
 * This module provide a global dragging service to other components.
 */
@Injectable({
  providedIn: 'root'
})
export class NzDragService {
  private draggingThreshold = 5;
  private currentDraggingSequence: Subject<MouseEvent | Touch> | null = null;
  private currentStartingPoint: Point | null = null;
  private handleRegistry = new Set<HandlerItem>();
  private renderer = inject(RendererFactory2).createRenderer(null, null);

  requestDraggingSequence(event: MouseEvent | TouchEvent): Observable<Delta> {
    if (!this.handleRegistry.size) {
      this.registerDraggingHandler(isTouchEvent(event));
    }

    // Complete last dragging sequence if a new target is dragged.
    if (this.currentDraggingSequence) {
      this.currentDraggingSequence.complete();
    }

    this.currentStartingPoint = getPagePosition(event);
    this.currentDraggingSequence = new Subject<MouseEvent | Touch>();

    return this.currentDraggingSequence.pipe(
      map((e: MouseEvent | Touch) => ({
        x: e.pageX - this.currentStartingPoint!.x,
        y: e.pageY - this.currentStartingPoint!.y
      })),
      filter((e: Delta) => Math.abs(e.x) > this.draggingThreshold || Math.abs(e.y) > this.draggingThreshold),
      finalize(() => this.teardownDraggingSequence())
    );
  }

  private registerDraggingHandler(isTouch: boolean): void {
    if (isTouch) {
      this.handleRegistry.add({
        teardown: this.renderer.listen('document', 'touchmove', (e: TouchEvent) => {
          if (this.currentDraggingSequence) {
            this.currentDraggingSequence.next(e.touches[0] || e.changedTouches[0]);
          }
        })
      });
      this.handleRegistry.add({
        teardown: this.renderer.listen('document', 'touchend', () => {
          if (this.currentDraggingSequence) {
            this.currentDraggingSequence.complete();
          }
        })
      });
    } else {
      this.handleRegistry.add({
        teardown: this.renderer.listen('document', 'mousemove', e => {
          if (this.currentDraggingSequence) {
            this.currentDraggingSequence.next(e);
          }
        })
      });
      this.handleRegistry.add({
        teardown: this.renderer.listen('document', 'mouseup', () => {
          if (this.currentDraggingSequence) {
            this.currentDraggingSequence.complete();
          }
        })
      });
    }
  }

  private teardownDraggingSequence(): void {
    this.currentDraggingSequence = null;
  }
}
