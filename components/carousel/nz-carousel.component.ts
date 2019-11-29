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
import { animationFrameScheduler, fromEvent, interval, merge, Observable, Subject } from 'rxjs';
import {
  filter,
  finalize,
  map,
  observeOn,
  repeatWhen,
  share,
  startWith,
  switchMap,
  takeLast,
  takeUntil,
  tap
} from 'rxjs/operators';

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
  NZ_CAROUSEL_CUSTOM_STRATEGIES
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
  dotClick$ = new Subject<number>();

  private destroy$ = new Subject<void>();
  private autoPlayChange$ = new Subject<void>();
  private gestureRect: ClientRect | null = null;
  private isTransiting = false;

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

    this.setupStream();
    this.setupResize();
    this.setupContentChange();

    // Init.
    this.switchStrategy();
    this.markContentActive(0);
    this.syncStrategy();

    // If embedded in an entry component, it may do initial render at a inappropriate time.
    // ngZone.onStable won't do this trick.
    // TODO(wendzhue): what if it's inside a DOM-unstable component like Modal?
    Promise.resolve().then(() => {
      this.syncStrategy();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzEffect, nzDotPosition, nzAutoPlaySpeed } = changes;

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

    if (nzAutoPlaySpeed) {
      console.log('a');
    }

    if (nzAutoPlaySpeed && !nzAutoPlaySpeed.isFirstChange()) {
      console.log('should change!');
      this.autoPlayChange$.next();
    }
  }

  ngOnDestroy(): void {
    // this.clearScheduledTransition();
    if (this.strategy) {
      this.strategy.dispose();
    }

    this.destroy$.next();
    this.destroy$.complete();
    this.dotClick$.complete();
    this.autoPlayChange$.complete();
  }

  /**
   * Expose for developers to programmatically set activeIndex.
   */
  public next(): void {
    this.goTo(this.activeIndex + 1);
  }

  /**
   * Expose for developers to programmatically set activeIndex.
   */
  public pre(): void {
    this.goTo(this.activeIndex - 1);
  }

  /**
   * Expose for developers to programmatically set activeIndex.
   */
  public goTo(index: number): void {
    if (this.carouselContents && this.carouselContents.length && !this.isTransiting) {
      const length = this.carouselContents.length;
      const from = this.activeIndex;
      const to = (index + length) % length;
      this.isTransiting = true;
      this.nzBeforeChange.emit({ from, to });
      this.strategy.switch(this.activeIndex, index).subscribe(() => {
        this.nzAfterChange.emit(index);
        this.isTransiting = false;
      });
      this.markContentActive(to);
      this.cdr.markForCheck();
    }
  }

  private setupStream(): void {
    const manualTransitions$ = merge(this.setupKeyboard(), this.setupSwipe(), this.setupDot()).pipe(share());
    const timer$ = this.setupTimer(manualTransitions$);
    merge(manualTransitions$, timer$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(direction => this.goTo(direction));
    // manualTransitions$.pipe(takeUntil(this.destroy$)).subscribe((direction) => this.goTo(direction));
  }

  private setupDot(): Observable<number> {
    return this.dotClick$;
  }

  private setupKeyboard(): Observable<number> {
    const carouselElement = this.slickListEl;
    const leftArrow$ = fromEvent(carouselElement, 'keydown').pipe(
      filter((event: Event) => (event as KeyboardEvent).keyCode === LEFT_ARROW),
      tap(e => e.preventDefault()),
      map(() => this.activeIndex - 1)
    );
    const rightArrow$ = fromEvent(carouselElement, 'keydown').pipe(
      filter((event: Event) => (event as KeyboardEvent).keyCode === RIGHT_ARROW),
      tap(e => e.preventDefault()),
      map(() => this.activeIndex + 1)
    );
    return merge(leftArrow$, rightArrow$);
  }

  private setupSwipe(): Observable<number> {
    const carouselElement = this.slickListEl;
    const start$ = merge(fromEvent(carouselElement, 'mousedown'), fromEvent(carouselElement, 'touchdown')).pipe(
      tap(() => (this.gestureRect = this.slickListEl.getBoundingClientRect()))
    );
    const move$ = (startEvent: MouseEvent | TouchEvent) =>
      this.nzDragService.requestDraggingSequence(startEvent).pipe(
        observeOn(animationFrameScheduler), // performance
        tap(delta => {
          this.strategy.dragging(delta);
        }), // do animation here
        takeLast(1)
      );
    return start$.pipe(
      switchMap(startEvent => move$(startEvent as TouchEvent | MouseEvent)),
      map(delta => {
        const xDelta = delta.x;
        const direction = Math.abs(xDelta) > this.gestureRect!.width / 3 ? (xDelta > 0 ? -1 : 1) : 0;
        return this.activeIndex + direction;
      }),
      tap(() => (this.gestureRect = null))
    );
  }

  private setupTimer(manualTransitions$: Observable<number>): Observable<number> {
    return this.autoPlayChange$.pipe(
      startWith(true),
      map(() => this.nzAutoPlaySpeed),
      switchMap(speed =>
        interval(speed)
          .pipe(
            takeUntil(manualTransitions$),
            repeatWhen(self => self),
            filter(() => this.nzAutoPlay),
            map(() => this.activeIndex + 1)
          )
          .pipe(finalize(() => console.log('I am removed')))
      ),
      finalize(() => console.log('I am alsooooooo removed'))
    );
  }

  private setupResize(): void {
    this.nzDomEventService
      .registerResizeListener()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.nzDomEventService.unregisterResizeListener())
      )
      .subscribe(() => {
        this.syncStrategy();
      });
  }

  private setupContentChange(): void {
    this.carouselContents.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.markContentActive(0);
      this.syncStrategy();
    });
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

  private markContentActive(index: number): void {
    this.activeIndex = index;

    if (this.carouselContents) {
      this.carouselContents.forEach((slide, i) => {
        slide.isActive = index === i;
      });
    }

    this.cdr.markForCheck();
  }

  private syncStrategy(): void {
    if (this.strategy) {
      this.strategy.withCarouselContents(this.carouselContents);
    }
  }
}
