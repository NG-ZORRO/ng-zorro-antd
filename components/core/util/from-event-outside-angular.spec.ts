/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, inject, NgZone, provideZoneChangeDetection } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { fromEvent } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { fromEventOutsideAngular } from './from-event-outside-angular';

@Component({
  template: ``
})
class TestComponent {
  readonly recorder: NzSafeAny[] = [];

  constructor() {
    const ngZone = inject(NgZone);

    ngZone.run(() => {
      fromEvent(document, 'click')
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.recorder.push(['fromEvent in zone: ', NgZone.isInAngularZone()]);
        });

      fromEventOutsideAngular(document, 'click')
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.recorder.push(['fromEventOutsideAngular in zone: ', NgZone.isInAngularZone()]);
        });
    });
  }
}

describe('fromEventOutsideAngular', () => {
  it('should add event listener outside of the Angular zone', () => {
    TestBed.configureTestingModule({
      providers: [provideZoneChangeDetection()]
    });
    const fixture = TestBed.createComponent(TestComponent);
    document.body.click();
    expect(fixture.componentInstance.recorder).toEqual([
      ['fromEvent in zone: ', true],
      ['fromEventOutsideAngular in zone: ', false]
    ]);
  });
});
