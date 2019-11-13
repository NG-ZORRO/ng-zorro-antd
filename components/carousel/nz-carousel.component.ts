/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
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
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import {
  warnDeprecation,
  InputBoolean,
  InputNumber,
  NzConfigService,
  NzDomEventService,
  NzDragService,
  WithConfig
} from 'ng-zorro-antd/core';

import { NzCarouselContentDirective } from './nz-carousel-content.directive';
import {
  FromToInterface,
  NzCarouselDotPosition,
  NzCarouselEffects,
  NzCarouselStrategyRegistryItem,
  NZ_CAROUSEL_CUSTOM_STRATEGIES,
  PointerVector
} from './nz-carousel-definitions';
import { NzCarouselBaseStrategy } from './strategies/base-strategy';
import { NzCarouselOpacityStrategy } from './strategies/opacity-strategy';
import { NzCarouselTransformStrategy } from './strategies/transform-strategy';

const NZ_CONFIG_COMPONENT_NAME = 'carousel';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-carousel',
  exportAs: 'nzCarousel',
  preserveWhitespaces: false,
  templateUrl: './nz-carousel.component.html',
  host: {
    '[class.ant-carousel-vertical]': 'vertical'
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

  @ViewChild('slickList', { static: false }) slickList: ElementRef;
  @ViewChild('slickTrack', { static: false }) slickTrack: ElementRef;

  @Input() nzDotRender: TemplateRef<{ $implicit: number }>;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'scrollx') nzEffect: NzCarouselEffects;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzEnableSwipe: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzDots: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzAutoPlay: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 3000) @InputNumber() nzAutoPlaySpeed: number;
  @Input() @InputNumber() nzTransitionSpeed = 500;

  @Input()
  @InputBoolean()
  get nzVertical(): boolean {
    return this.vertical;
  }

  set nzVertical(value: boolean) {
    warnDeprecation(`'nzVertical' is deprecated and will be removed in 9.0.0. Please use 'nzDotPosition' instead.`);
    this.vertical = value;
  }

  @Input()
  @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'bottom')
  set nzDotPosition(value: NzCarouselDotPosition) {
    this._dotPosition = value;
    if (value === 'left' || value === 'right') {
      this.vertical = true;
    } else {
      this.vertical = false;
    }
  }

  get nzDotPosition(): NzCarouselDotPosition {
    return this._dotPosition;
  }

  private _dotPosition: NzCarouselDotPosition;

  @Output() readonly nzBeforeChange = new EventEmitter<FromToInterface>();
  @Output() readonly nzAfterChange = new EventEmitter<number>();

  activeIndex = 0;
  el: HTMLElement;
  slickListEl: HTMLElement;
  slickTrackEl: HTMLElement;
  strategy: NzCarouselBaseStrategy;
  vertical = false;
  transitionInProgress: number | null;

  private destroy$ = new Subject<void>();
  private gestureRect: ClientRect | null = null;
  private pointerDelta: PointerVector | null = null;
  private isTransiting = false;
  private isDragging = false;

  constructor(
    elementRef: ElementRef,
    public readonly nzConfigService: NzConfigService,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef,
    private readonly platform: Platform,
    private readonly nzDomEventService: NzDomEventService,
    private readonly nzDragService: NzDragService,
    @Optional() @Inject(NZ_CAROUSEL_CUSTOM_STRATEGIES) private customStrategies: NzCarouselStrategyRegistryItem[]
  ) {
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
      this.syncStrategy();
    });

    this.nzDomEventService
      .registerResizeListener()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.nzDomEventService.unregisterResizeListener())
      )
      .subscribe(() => {
        this.syncStrategy();
      });

    this.switchStrategy();
    this.markContentActive(0);
    this.syncStrategy();

    // If embedded in an entry component, it may do initial render at a inappropriate time.
    // ngZone.onStable won't do this trick
    Promise.resolve().then(() => {
      this.syncStrategy();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzEffect, nzDotPosition } = changes;

    if (nzEffect && !nzEffect.isFirstChange()) {
      this.switchStrategy();
      this.markContentActive(0);
      this.syncStrategy();
    }

    if (nzDotPosition && !nzDotPosition.isFirstChange()) {
      this.switchStrategy();
      this.markContentActive(0);
      this.syncStrategy();
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

    // Load custom strategies first.
    const customStrategy = this.customStrategies ? this.customStrategies.find(s => s.name === this.nzEffect) : null;
    if (customStrategy) {
      // tslint:disable-next-line:no-any
      this.strategy = new (customStrategy.strategy as any)(this, this.cdr, this.renderer);
      return;
    }

    this.strategy =
      this.nzEffect === 'scrollx'
        ? new NzCarouselTransformStrategy(this, this.cdr, this.renderer)
        : new NzCarouselOpacityStrategy(this, this.cdr, this.renderer);
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

  /**
   * Drag carousel.
   * @param event
   */
  pointerDown = (event: TouchEvent | MouseEvent) => {
    if (!this.isDragging && !this.isTransiting && this.nzEnableSwipe) {
      this.clearScheduledTransition();
      this.gestureRect = this.slickListEl.getBoundingClientRect();

      this.nzDragService.requestDraggingSequence(event).subscribe(
        delta => {
          this.pointerDelta = delta;
          this.isDragging = true;
          this.strategy.dragging(this.pointerDelta);
        },
        () => {},
        () => {
          if (this.nzEnableSwipe && this.isDragging) {
            const xDelta = this.pointerDelta ? this.pointerDelta.x : 0;

            // Switch to another slide if delta is bigger than third of the width.
            if (Math.abs(xDelta) > this.gestureRect!.width / 3) {
              this.goTo(xDelta > 0 ? this.activeIndex - 1 : this.activeIndex + 1);
            } else {
              this.goTo(this.activeIndex);
            }

            this.gestureRect = null;
            this.pointerDelta = null;
          }

          this.isDragging = false;
        }
      );
    }
  };

  private syncStrategy(): void {
    if (this.strategy) {
      this.strategy.withCarouselContents(this.carouselContents);
    }
  }
}
