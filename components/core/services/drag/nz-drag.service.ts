/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { auditTime, filter, finalize, map } from 'rxjs/operators';

import { getEventPosition } from '../../util/dom';
import { NzDragServiceModule } from './nz-drag.service.module';

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
  providedIn: NzDragServiceModule
})
export class NzDragService {
  private awaitingSequence = false;
  private draggingThreshold = 5;
  private currentDraggingSequence: Subject<MouseEvent | Touch> | null = null;
  private currentStartingPoint: Point | null = null;
  private handleRegistry = new Set<HandlerItem>();
  private renderer: Renderer2;

  constructor(rendererFactory2: RendererFactory2) {
    this.renderer = rendererFactory2.createRenderer(null, null);
  }

  requestDraggingSequence(event: MouseEvent | TouchEvent): Observable<Delta> {
    if (!this.handleRegistry.size) {
      this.registerDraggingHandler();
    }

    this.awaitingSequence = true;

    // Complete last dragging sequence if a new target is dragged.
    if (this.currentDraggingSequence) {
      this.currentDraggingSequence.complete();
    }

    this.currentStartingPoint = getPagePosition(event);
    this.currentDraggingSequence = new Subject<MouseEvent | Touch>();
    this.awaitingSequence = false;

    return this.currentDraggingSequence.pipe(
      auditTime(16),
      map((e: MouseEvent | Touch) => {
        return {
          x: e.pageX - this.currentStartingPoint!.x,
          y: e.pageY - this.currentStartingPoint!.y
        };
      }),
      filter((e: Delta) => Math.abs(e.x) > this.draggingThreshold || Math.abs(e.y) > this.draggingThreshold),
      finalize(() => this.teardownDraggingSequence())
    );
  }

  private registerDraggingHandler(): void {
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
  }

  private unregisterDraggingHandler(): void {
    this.handleRegistry.forEach(r => r.teardown());
    this.handleRegistry.clear();
  }

  private teardownDraggingSequence(): void {
    this.currentDraggingSequence = null;

    if (!this.awaitingSequence) {
      this.unregisterDraggingHandler();
    }
  }
}
