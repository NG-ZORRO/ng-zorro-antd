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
  numberAttribute,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzDragService, NzResizeService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

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
  imports: [NgTemplateOutlet]
})
export class NzCarouselComponent implements AfterContentInit, AfterViewInit, OnChanges, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  public readonly nzConfigService = inject(NzConfigService);
  public readonly ngZone = inject(NgZone);
  private readonly renderer = inject(Renderer2);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly platform = inject(Platform);
  private readonly resizeService = inject(NzResizeService);
  private readonly nzDragService = inject(NzDragService);
  private nzResizeObserver = inject(NzResizeObserver);
  private destroyRef = inject(DestroyRef);

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
    this.vertical = value === 'left' || value === 'right';
  }

  get nzDotPosition(): NzCarouselDotPosition {
    return this._dotPosition;
  }

  private _dotPosition: NzCarouselDotPosition = 'bottom';

  @Output() readonly nzBeforeChange = new EventEmitter<FromToInterface>();
  @Output() readonly nzAfterChange = new EventEmitter<number>();

  activeIndex = 0;
  el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  slickListEl!: HTMLElement;
  slickTrackEl!: HTMLElement;
  strategy?: NzCarouselBaseStrategy;
  vertical = false;
  transitionInProgress?: ReturnType<typeof setTimeout>;
  dir: Direction = 'ltr';

  private gestureRect: DOMRect | null = null;
  private pointerDelta: PointerVector | null = null;
  private isTransiting = false;
  private isDragging = false;
  private directionality = inject(Directionality);
  private customStrategies = inject(NZ_CAROUSEL_CUSTOM_STRATEGIES, { optional: true });

  constructor() {
    this.nzDotPosition = 'bottom';
    this.destroyRef.onDestroy(() => {
      this.clearScheduledTransition();
      this.strategy?.dispose();
    });
  }

  ngOnInit(): void {
    this.slickListEl = this.slickList!.nativeElement;
    this.slickTrackEl = this.slickTrack!.nativeElement;

    this.dir = this.directionality.value;

    this.directionality.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.markContentActive(this.activeIndex);
      this.cdr.detectChanges();
    });

    fromEventOutsideAngular<KeyboardEvent>(this.slickListEl, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
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

    this.nzResizeObserver
      .observe(this.el)
      .pipe(debounceTime(100), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.layout());
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
      .connect()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.layout());

    this.switchStrategy();
    this.markContentActive(0);
    this.layout();

    // If embedded in an entry component, it may do initial render at an inappropriate time.
    // ngZone.onStable won't do this trick
    // TODO: need to change this.
    Promise.resolve().then(() => this.layout());
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
    this.carouselContents?.forEach((slide, i) => (slide.isActive = index === i));
    this.cdr.markForCheck();
  }

  /**
   * Drag carousel.
   */
  pointerDown = (event: TouchEvent | MouseEvent): void => {
    if (!this.isDragging && !this.isTransiting && this.nzEnableSwipe) {
      this.clearScheduledTransition();
      this.gestureRect = this.slickListEl.getBoundingClientRect();

      this.nzDragService.requestDraggingSequence(event).subscribe({
        next: delta => {
          this.pointerDelta = delta;
          this.isDragging = true;
          this.strategy?.dragging(this.pointerDelta);
        },
        complete: () => {
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
      });
    }
  };

  layout(): void {
    this.strategy?.withCarouselContents(this.carouselContents);
  }
}
