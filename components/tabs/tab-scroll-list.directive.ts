/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

import {
  NzTabScrollEvent,
  NzTabScrollEventHandlerFun,
  NzTabScrollListOffset,
  NzTabScrollListOffsetEvent
} from './interfaces';

const MIN_SWIPE_DISTANCE = 0.1;
const STOP_SWIPE_DISTANCE = 0.01;
const REFRESH_INTERVAL = 20;
const SPEED_OFF_MULTIPLE = 0.995 ** REFRESH_INTERVAL;

@Directive({
  selector: '[nzTabScrollList]'
})
export class NzTabScrollListDirective implements OnInit, OnDestroy {
  lastWheelDirection: 'x' | 'y' | null = null;
  lastWheelTimestamp = 0;
  lastTimestamp = 0;
  lastTimeDiff = 0;
  lastMixedWheel = 0;
  lastWheelPrevent = false;
  touchPosition: NzTabScrollListOffset | null = null;
  lastOffset: NzTabScrollListOffset | null = null;
  motion = -1;

  unsubscribe: () => void = () => void 0;

  @Output() readonly offsetChange = new EventEmitter<NzTabScrollListOffsetEvent>();
  @Output() readonly tabScroll = new EventEmitter<NzTabScrollEvent>();

  constructor(private ngZone: NgZone, private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.unsubscribe = this.ngZone.runOutsideAngular(() => {
      const el = this.elementRef.nativeElement;

      const wheel$ = fromEvent<WheelEvent>(el, 'wheel');
      const touchstart$ = fromEvent<TouchEvent>(el, 'touchstart');
      const touchmove$ = fromEvent<TouchEvent>(el, 'touchmove');
      const touchend$ = fromEvent<TouchEvent>(el, 'touchend');

      const subscription = new Subscription();
      subscription.add(this.subscribeWrap('wheel', wheel$, this.onWheel));
      subscription.add(this.subscribeWrap('touchstart', touchstart$, this.onTouchStart));
      subscription.add(this.subscribeWrap('touchmove', touchmove$, this.onTouchMove));
      subscription.add(this.subscribeWrap('touchend', touchend$, this.onTouchEnd));

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  subscribeWrap<T extends NzTabScrollEvent['event']>(
    type: NzTabScrollEvent['type'],
    observable: Observable<T>,
    handler: NzTabScrollEventHandlerFun<T>
  ): Subscription {
    return observable.subscribe(event => {
      this.tabScroll.emit({
        type,
        event
      } as NzTabScrollEvent);
      if (!event.defaultPrevented) {
        handler(event);
      }
    });
  }

  onTouchEnd = (e: TouchEvent): void => {
    if (!this.touchPosition) {
      return;
    }
    const lastOffset = this.lastOffset;
    const lastTimeDiff = this.lastTimeDiff;

    this.lastOffset = this.touchPosition = null;

    if (lastOffset) {
      const distanceX = lastOffset.x / lastTimeDiff;
      const distanceY = lastOffset.y / lastTimeDiff;
      const absX = Math.abs(distanceX);
      const absY = Math.abs(distanceY);

      // Skip swipe if low distance
      if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) {
        return;
      }

      let currentX = distanceX;
      let currentY = distanceY;

      this.motion = window.setInterval(() => {
        if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
          window.clearInterval(this.motion);
          return;
        }

        currentX *= SPEED_OFF_MULTIPLE;
        currentY *= SPEED_OFF_MULTIPLE;
        this.onOffset(currentX * REFRESH_INTERVAL, currentY * REFRESH_INTERVAL, e);
      }, REFRESH_INTERVAL);
    }
  };

  onTouchMove = (e: TouchEvent): void => {
    if (!this.touchPosition) {
      return;
    }

    e.preventDefault();
    const { screenX, screenY } = e.touches[0];

    const offsetX = screenX - this.touchPosition.x;
    const offsetY = screenY - this.touchPosition.y;
    this.onOffset(offsetX, offsetY, e);
    const now = Date.now();

    this.lastTimeDiff = now - this.lastTimestamp;
    this.lastTimestamp = now;
    this.lastOffset = { x: offsetX, y: offsetY };
    this.touchPosition = { x: screenX, y: screenY };
  };

  onTouchStart = (e: TouchEvent): void => {
    const { screenX, screenY } = e.touches[0];
    this.touchPosition = { x: screenX, y: screenY };
    window.clearInterval(this.motion);
  };

  onWheel = (e: WheelEvent): void => {
    const { deltaX, deltaY } = e;
    let mixed: number;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX === absY) {
      mixed = this.lastWheelDirection === 'x' ? deltaX : deltaY;
    } else if (absX > absY) {
      mixed = deltaX;
      this.lastWheelDirection = 'x';
    } else {
      mixed = deltaY;
      this.lastWheelDirection = 'y';
    }

    // Optimize mac touch scroll
    const now = Date.now();
    const absMixed = Math.abs(mixed);

    if (now - this.lastWheelTimestamp > 100 || absMixed - this.lastMixedWheel > 10) {
      this.lastWheelPrevent = false;
    }
    this.onOffset(-mixed, -mixed, e);
    if (e.defaultPrevented || this.lastWheelPrevent) {
      this.lastWheelPrevent = true;
    }

    this.lastWheelTimestamp = now;
    this.lastMixedWheel = absMixed;
  };

  onOffset(x: number, y: number, event: Event): void {
    this.ngZone.run(() => {
      this.offsetChange.emit({
        x,
        y,
        event
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
