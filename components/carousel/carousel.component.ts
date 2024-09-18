/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  numberAttribute
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzDragService, NzResizeService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzCarouselContentDirective } from './carousel-content.directive';
import { NzCarouselBaseStrategy } from './strategies/base-strategy';
import { NzCarouselOpacityStrategy } from './strategies/opacity-strategy';
import { NzCarouselTransformStrategy } from './strategies/transform-strategy';
import {
  FromToInterface,
  NZ_CAROUSEL_CUSTOM_STRATEGIES,
  NzCarouselDotPosition,
  NzCarouselEffects,
  PointerVector
} from './typings';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'carousel';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-carousel',
  exportAs: 'nzCarousel',
  preserveWhitespaces: false,
  template: `
    <div
      class="slick-initialized slick-slider"
      [class.slick-vertical]="nzDotPosition === 'left' || nzDotPosition === 'right'"
      [dir]="'ltr'"
    >
      <div
        #slickList
        class="slick-list"
        tabindex="-1"
        (mousedown)="pointerDown($event)"
        (touchstart)="pointerDown($event)"
      >
        <!-- Render carousel items. -->
        <div class="slick-track" #slickTrack>
          <ng-content></ng-content>
        </div>
      </div>
      <!-- Render dots. -->
      @if (nzDots) {
        <ul
          class="slick-dots"
          [class.slick-dots-top]="nzDotPosition === 'top'"
          [class.slick-dots-bottom]="nzDotPosition === 'bottom'"
          [class.slick-dots-left]="nzDotPosition === 'left'"
          [class.slick-dots-right]="nzDotPosition === 'right'"
        >
          @for (content of carouselContents; track content) {
            <li [class.slick-active]="$index === activeIndex" (click)="goTo($index)">
              <ng-template
                [ngTemplateOutlet]="nzDotRender || renderDotTemplate"
                [ngTemplateOutletContext]="{ $implicit: $index }"
              ></ng-template>
            </li>
          }
        </ul>
      }
    </div>

    <ng-template #renderDotTemplate let-index>
      <button>{{ index + 1 }}</button>
    </ng-template>
  `,
  host: {
    class: 'ant-carousel',
    '[class.ant-carousel-vertical]': 'vertical',
    '[class.ant-carousel-rtl]': `dir === 'rtl'`
  },
  imports: [NgTemplateOutlet],
  standalone: true
})
export class NzCarouselComponent implements AfterContentInit, AfterViewInit, OnDestroy, OnChanges, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @ContentChildren(NzCarouselContentDirective) carouselContents!: QueryList<NzCarouselContentDirective>;

  @ViewChild('slickList', { static: true }) slickList!: ElementRef<HTMLElement>;
  @ViewChild('slickTrack', { static: true }) slickTrack!: ElementRef<HTMLElement>;

  @Input() nzDotRender?: TemplateRef<{ $implicit: number }>;
  @Input() @WithConfig() nzEffect: NzCarouselEffects = 'scrollx';
  @Input({ transform: booleanAttribute }) @WithConfig() nzEnableSwipe: boolean = true;
  @Input({ transform: booleanAttribute }) @WithConfig() nzDots: boolean = true;
  @Input({ transform: booleanAttribute }) @WithConfig() nzAutoPlay: boolean = false;
  @Input({ transform: numberAttribute }) @WithConfig() nzAutoPlaySpeed: number = 3000;
  @Input({ transform: numberAttribute }) nzTransitionSpeed = 500;
  @Input() @WithConfig() nzLoop: boolean = true;

  /**
   * this property is passed directly to an NzCarouselBaseStrategy
   */
  @Input() nzStrategyOptions: NzSafeAny = undefined;

  @Input()
  // @ts-ignore
  @WithConfig()
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

  private _dotPosition: NzCarouselDotPosition = 'bottom';

  @Output() readonly nzBeforeChange = new EventEmitter<FromToInterface>();
  @Output() readonly nzAfterChange = new EventEmitter<number>();

  activeIndex = 0;
  el: HTMLElement;
  slickListEl!: HTMLElement;
  slickTrackEl!: HTMLElement;
  strategy?: NzCarouselBaseStrategy;
  vertical = false;
  transitionInProgress?: ReturnType<typeof setTimeout>;
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();
  private gestureRect: ClientRect | null = null;
  private pointerDelta: PointerVector | null = null;
  private isTransiting = false;
  private isDragging = false;
  private directionality = inject(Directionality);
  private customStrategies = inject(NZ_CAROUSEL_CUSTOM_STRATEGIES, { optional: true });

  constructor(
    elementRef: ElementRef,
    public readonly nzConfigService: NzConfigService,
    public readonly ngZone: NgZone,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef,
    private readonly platform: Platform,
    private readonly resizeService: NzResizeService,
    private readonly nzDragService: NzDragService,
    private nzResizeObserver: NzResizeObserver
  ) {
    this.nzDotPosition = 'bottom';
    this.el = elementRef.nativeElement;
  }
  ngOnInit(): void {
    this.slickListEl = this.slickList!.nativeElement;
    this.slickTrackEl = this.slickTrack!.nativeElement;

    this.dir = this.directionality.value;

    this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.markContentActive(this.activeIndex);
      this.cdr.detectChanges();
    });

    this.ngZone.runOutsideAngular(() => {
      fromEvent<KeyboardEvent>(this.slickListEl, 'keydown')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          const { keyCode } = event;

          if (keyCode !== LEFT_ARROW && keyCode !== RIGHT_ARROW) {
            return;
          }

          event.preventDefault();

          this.ngZone.run(() => {
            if (keyCode === LEFT_ARROW) {
              this.pre();
            } else {
              this.next();
            }
            this.cdr.markForCheck();
          });
        });
    });

    this.nzResizeObserver
      .observe(this.el)
      .pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.layout();
      });
  }

  ngAfterContentInit(): void {
    this.markContentActive(0);
  }

  ngAfterViewInit(): void {
    this.carouselContents.changes.subscribe(() => {
      this.markContentActive(0);
      this.layout();
    });

    this.resizeService
      .subscribe()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.layout();
      });

    this.switchStrategy();
    this.markContentActive(0);
    this.layout();

    // If embedded in an entry component, it may do initial render at an inappropriate time.
    // ngZone.onStable won't do this trick
    // TODO: need to change this.
    Promise.resolve().then(() => {
      this.layout();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzEffect, nzDotPosition } = changes;

    if (nzEffect && !nzEffect.isFirstChange()) {
      this.switchStrategy();
      this.markContentActive(0);
      this.layout();
    }

    if (nzDotPosition && !nzDotPosition.isFirstChange()) {
      this.switchStrategy();
      this.markContentActive(0);
      this.layout();
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

  next(): void {
    this.goTo(this.activeIndex + 1);
  }

  pre(): void {
    this.goTo(this.activeIndex - 1);
  }

  goTo(index: number): void {
    if (
      this.carouselContents &&
      this.carouselContents.length &&
      !this.isTransiting &&
      (this.nzLoop || (index >= 0 && index < this.carouselContents.length))
    ) {
      const length = this.carouselContents.length;
      const from = this.activeIndex;
      const to = (index + length) % length;
      this.isTransiting = true;
      this.nzBeforeChange.emit({ from, to });
      this.strategy!.switch(this.activeIndex, index).subscribe(() => {
        this.scheduleNextTransition();
        this.nzAfterChange.emit(to);
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
      this.strategy = new (customStrategy.strategy as NzSafeAny)(this, this.cdr, this.renderer, this.platform);
      return;
    }

    this.strategy =
      this.nzEffect === 'scrollx'
        ? new NzCarouselTransformStrategy(this, this.cdr, this.renderer, this.platform)
        : new NzCarouselOpacityStrategy(this, this.cdr, this.renderer, this.platform);
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
      this.transitionInProgress = undefined;
    }
  }

  private markContentActive(index: number): void {
    this.activeIndex = index;

    if (this.carouselContents) {
      this.carouselContents.forEach((slide, i) => {
        if (this.dir === 'rtl') {
          slide.isActive = index === this.carouselContents.length - 1 - i;
        } else {
          slide.isActive = index === i;
        }
      });
    }

    this.cdr.markForCheck();
  }

  /**
   * Drag carousel.
   */
  pointerDown = (event: TouchEvent | MouseEvent): void => {
    if (!this.isDragging && !this.isTransiting && this.nzEnableSwipe) {
      this.clearScheduledTransition();
      this.gestureRect = this.slickListEl.getBoundingClientRect();

      this.nzDragService.requestDraggingSequence(event).subscribe(
        delta => {
          this.pointerDelta = delta;
          this.isDragging = true;
          this.strategy?.dragging(this.pointerDelta);
        },
        () => {},
        () => {
          if (this.nzEnableSwipe && this.isDragging) {
            const xDelta = this.pointerDelta ? this.pointerDelta.x : 0;

            // Switch to another slide if delta is bigger than third of the width.
            if (
              Math.abs(xDelta) > this.gestureRect!.width / 3 &&
              (this.nzLoop ||
                (xDelta <= 0 && this.activeIndex + 1 < this.carouselContents.length) ||
                (xDelta > 0 && this.activeIndex > 0))
            ) {
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

  layout(): void {
    if (this.strategy) {
      this.strategy.withCarouselContents(this.carouselContents);
    }
  }
}
