/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, Subscription } from 'rxjs';

import {
  createMouseEvent,
  createTouchEvent,
  dispatchMouseEvent,
  dispatchTouchEvent,
  updateNonSignalsInput
} from 'ng-zorro-antd/core/testing';

import { NzDragService } from './drag';

@Component({
  template: ''
})
export class NzTestDragServiceComponent {
  public nzDragService = inject(NzDragService);
  drag$ = new Subject<void>();
  complete$ = new Subject<void>();

  drag(event: MouseEvent | TouchEvent): void {
    this.nzDragService.requestDraggingSequence(event).subscribe({
      next: () => this.drag$.next(),
      complete: () => this.complete$.next()
    });
  }
}

describe('drag service', () => {
  let fixture: ComponentFixture<NzTestDragServiceComponent>;
  let component: NzTestDragServiceComponent;

  let completed = false;
  let dragged = false;
  let drag_: Subscription;
  let complete_: Subscription;

  describe('basics', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDragServiceComponent);
      component = fixture.debugElement.componentInstance;
    });

    beforeEach(() => {
      completed = false;
      dragged = false;

      complete_ = component.complete$.subscribe(() => (completed = true));
      drag_ = component.drag$.subscribe(() => (dragged = true));
    });

    afterEach(() => {
      drag_?.unsubscribe();
      complete_?.unsubscribe();
    });

    it('should mousedown work', async () => {
      component.drag(createMouseEvent('mousedown', 0, 0));
      dispatchMouseEvent(document, 'mousemove', 100, 0);

      await stabilize(fixture, 20);
      expect(dragged).toBeTruthy();

      dispatchMouseEvent(document, 'mouseup');
      expect(completed).toBeTruthy();
    });

    it('should touchdown work', async () => {
      component.drag(createTouchEvent('touchdown') as TouchEvent);
      dispatchTouchEvent(document, 'touchmove', 100, 0);

      await stabilize(fixture, 20);
      expect(dragged).toBeTruthy();

      dispatchTouchEvent(document, 'touchend');
      expect(completed).toBeTruthy();
    });

    it('should close previous drag sequence', () => {
      component.drag(createMouseEvent('mousedown', 0, 0));
      component.drag(createMouseEvent('mousedown', 0, 0));

      expect(completed).toBeTruthy();
      expect(dragged).toBeFalsy();
    });

    it('should threshold work', async () => {
      component.drag(createMouseEvent('mousedown', 0, 0));
      dispatchMouseEvent(document, 'mousemove', 4, 0);

      await stabilize(fixture, 20);
      expect(dragged).toBeFalsy();

      dispatchMouseEvent(document, 'mouseup');
      expect(completed).toBeTruthy();
    });
  });
});

async function stabilize<T>(fixture: ComponentFixture<T>, ms: number = 1): Promise<void> {
  fixture.detectChanges();
  await updateNonSignalsInput(fixture, ms);
  fixture.detectChanges();
}
