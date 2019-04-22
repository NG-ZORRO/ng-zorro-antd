/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

import { isTouchEvent, InputBoolean, InputNumber } from 'ng-zorro-antd/core';
import { take, takeUntil, throttleTime } from 'rxjs/operators';

import { NzCarouselContentDirective } from './nz-carousel-content.directive';
import { FromToInterface, NzCarouselEffects, PointerVector } from './nz-carousel-definitions';
import { NzCarouselBaseStrategy } from './strategies/base-strategy';
import { NzCarouselOpacityStrategy } from './strategies/opacity-strategy';
import { NzCarouselTransformStrategy } from './strategies/transform-strategy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-carousel',
  exportAs: 'nzCarousel',
  preserveWhitespaces: false,
  templateUrl: './nz-carousel.component.html',
  host: {
    '[class.ant-carousel-vertical]': 'nzVertical'
  },
  styles: [
    `
      nz-carousel {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }

      .slick-dots {
        display: block;
      }

      .slick-track {
        opacity: 1;
      }
    `
  ]
})
export class NzCarouselComponent implements AfterContentInit, AfterViewInit, OnDestroy, OnChanges {
  @ContentChildren(NzCarouselContentDirective) carouselContents: QueryList<NzCarouselContentDirective>;

  @ViewChild('slickList') slickList: ElementRef;
  @ViewChild('slickTrack') slickTrack: ElementRef;

  @Input() nzDotRender: TemplateRef<{ $implicit: number }>;
  @Input() nzEffect: NzCarouselEffects = 'scrollx';
  @Input() @InputBoolean() nzEnableSwipe = true;
  @Input() @InputBoolean() nzDots: boolean = true;
  @Input() @InputBoolean() nzVertical: boolean = false;
  @Input() @InputBoolean() nzAutoPlay = false;
  @Input() @InputNumber() nzAutoPlaySpeed = 3000;
  @Input() @InputNumber() nzTransitionSpeed = 500;

  @Output() readonly nzBeforeChange = new EventEmitter<FromToInterface>();
  @Output() readonly nzAfterChange = new EventEmitter<number>();

  activeIndex = 0;
  el: HTMLElement;
  slickListEl: HTMLElement;
  slickTrackEl: HTMLElement;
  strategy: NzCarouselBaseStrategy;
  transitionInProgress: number | null;

  private destroy$ = new Subject<void>();
  private document: Document;
  private gestureRect: ClientRect | null = null;
  private pointerDelta: PointerVector | null = null;
  private pointerPosition: PointerVector | null = null;
  private isTransiting = false;
  private isDragging = false;

  constructor(
    elementRef: ElementRef,
    @Inject(DOCUMENT) document: any, // tslint:disable-line:no-any
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private platform: Platform
  ) {
    this.document = document;
    this.renderer.addClass(elementRef.nativeElement, 'ant-carousel');
    this.el = elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    this.markContentActive(0);
  }

  ngAfterViewInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.slickListEl = this.slickList.nativeElement;
    this.slickTrackEl = this.slickTrack.nativeElement;

    this.carouselContents.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.markContentActive(0);
      this.strategy.withCarouselContents(this.carouselContents);
    });

    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(
          takeUntil(this.destroy$),
          throttleTime(16)
        )
        .subscribe(() => {
          this.strategy.withCarouselContents(this.carouselContents);
        });
    });

    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.switchStrategy();
      this.strategy.withCarouselContents(this.carouselContents);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzEffect } = changes;

    if (nzEffect && !nzEffect.isFirstChange()) {
      this.switchStrategy();
    }

    if (!this.nzAutoPlay || !this.nzAutoPlaySpeed) {
      this.clearScheduledTransition();
    } else {
      this.scheduleNextTransition();
    }
  }

  ngOnDestroy(): void {
    this.clearScheduledTransition();
    if (this.strategy) {
      this.strategy.dispose();
    }
    this.dispose();

    this.destroy$.next();
    this.destroy$.complete();
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === LEFT_ARROW) {
      e.preventDefault();
      this.pre();
    } else if (e.keyCode === RIGHT_ARROW) {
      this.next();
      e.preventDefault();
    }
  }

  next(): void {
    this.goTo(this.activeIndex + 1);
  }

  pre(): void {
    this.goTo(this.activeIndex - 1);
  }

  goTo(index: number): void {
    if (this.carouselContents && this.carouselContents.length && !this.isTransiting) {
      const length = this.carouselContents.length;
      const from = this.activeIndex;
      const to = (index + length) % length;
      this.isTransiting = true;
      this.nzBeforeChange.emit({ from, to });
      this.strategy.switch(this.activeIndex, index).subscribe(() => {
        this.scheduleNextTransition();
        this.nzAfterChange.emit(index);
        this.isTransiting = false;
      });
      this.markContentActive(to);
      this.cdr.markForCheck();
    }
  }

  private switchStrategy(): void {
    if (this.strategy) {
      this.strategy.dispose();
    }

    this.strategy =
      this.nzEffect === 'scrollx'
        ? new NzCarouselTransformStrategy(this, this.cdr, this.renderer)
        : new NzCarouselOpacityStrategy(this, this.cdr, this.renderer);

    this.markContentActive(0);
    this.strategy.withCarouselContents(this.carouselContents);
  }

  private scheduleNextTransition(): void {
    this.clearScheduledTransition();
    if (this.nzAutoPlay && this.nzAutoPlaySpeed > 0 && this.platform.isBrowser) {
      this.transitionInProgress = setTimeout(() => {
        this.goTo(this.activeIndex + 1);
      }, this.nzAutoPlaySpeed);
    }
  }

  private clearScheduledTransition(): void {
    if (this.transitionInProgress) {
      clearTimeout(this.transitionInProgress);
      this.transitionInProgress = null;
    }
  }

  private markContentActive(index: number): void {
    this.activeIndex = index;

    if (this.carouselContents) {
      this.carouselContents.forEach((slide, i) => {
        slide.isActive = index === i;
      });
    }

    this.cdr.markForCheck();
  }

  pointerDown = (event: TouchEvent | MouseEvent) => {
    if (!this.isDragging && !this.isTransiting && this.nzEnableSwipe) {
      const point = isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
      this.isDragging = true;
      this.clearScheduledTransition();
      this.gestureRect = this.slickListEl.getBoundingClientRect();
      this.pointerPosition = { x: point.clientX, y: point.clientY };

      this.document.addEventListener('mousemove', this.pointerMove);
      this.document.addEventListener('touchmove', this.pointerMove);
      this.document.addEventListener('mouseup', this.pointerUp);
      this.document.addEventListener('touchend', this.pointerUp);
    }
  };

  pointerMove = (event: TouchEvent | MouseEvent) => {
    if (this.isDragging) {
      const point = isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
      this.pointerDelta = { x: point.clientX - this.pointerPosition!.x, y: point.clientY - this.pointerPosition!.y };
      if (Math.abs(this.pointerDelta.x) > 5) {
        this.strategy.dragging(this.pointerDelta);
      }
    }
  };

  pointerUp = () => {
    if (this.isDragging && this.nzEnableSwipe) {
      const delta = this.pointerDelta ? this.pointerDelta.x : 0;

      // Switch to another slide if delta is third of the width.
      if (Math.abs(delta) > this.gestureRect!.width / 3) {
        this.goTo(delta > 0 ? this.activeIndex - 1 : this.activeIndex + 1);
      } else {
        this.goTo(this.activeIndex);
      }

      this.gestureRect = null;
      this.pointerDelta = null;
      this.isDragging = false;
      this.dispose();
    }
  };

  private dispose(): void {
    this.document.removeEventListener('mousemove', this.pointerMove);
    this.document.removeEventListener('touchmove', this.pointerMove);
    this.document.removeEventListener('touchend', this.pointerMove);
    this.document.removeEventListener('mouseup', this.pointerMove);
  }
}
