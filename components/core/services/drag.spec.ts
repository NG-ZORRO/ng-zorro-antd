/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, inject } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Subject, Subscription } from 'rxjs';

import { createMouseEvent, createTouchEvent, dispatchMouseEvent, dispatchTouchEvent } from 'ng-zorro-antd/core/testing';

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
      if (drag_) {
        drag_.unsubscribe();
      }

      if (complete_) {
        complete_.unsubscribe();
      }
    });

    it('should mousedown work', fakeAsync(() => {
      component.drag(createMouseEvent('mousedown', 0, 0));
      dispatchMouseEvent(document, 'mousemove', 100, 0);

      tickMilliseconds(fixture, 20);
      expect(dragged).toBeTruthy();

      dispatchMouseEvent(document, 'mouseup');
      expect(completed).toBeTruthy();
    }));

    it('should touchdown work', fakeAsync(() => {
      component.drag(createTouchEvent('touchdown') as TouchEvent);
      dispatchTouchEvent(document, 'touchmove', 100, 0);

      tickMilliseconds(fixture, 20);
      expect(dragged).toBeTruthy();

      dispatchTouchEvent(document, 'touchend');
      expect(completed).toBeTruthy();
    }));

    it('should close previous drag sequence', () => {
      component.drag(createMouseEvent('mousedown', 0, 0));
      component.drag(createMouseEvent('mousedown', 0, 0));

      expect(completed).toBeTruthy();
      expect(dragged).toBeFalsy();
    });

    it('should threshold work', fakeAsync(() => {
      component.drag(createMouseEvent('mousedown', 0, 0));
      dispatchMouseEvent(document, 'mousemove', 4, 0);

      tickMilliseconds(fixture, 20);
      expect(dragged).toBeFalsy();

      dispatchMouseEvent(document, 'mouseup');
      expect(completed).toBeTruthy();
    }));
  });
});

function tickMilliseconds<T>(fixture: ComponentFixture<T>, seconds: number = 1): void {
  fixture.detectChanges();
  tick(seconds);
  fixture.detectChanges();
}
