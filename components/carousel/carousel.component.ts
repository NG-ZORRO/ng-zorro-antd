/**
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
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzDragService, NzResizeService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NumberInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzCarouselContentDirective } from './carousel-content.directive';
import { NzCarouselBaseStrategy } from './strategies/base-strategy';
import { NzCarouselOpacityStrategy } from './strategies/opacity-strategy';
import { NzCarouselTransformStrategy } from './strategies/transform-strategy';
import {
  FromToInterface,
  NZ_CAROUSEL_CUSTOM_STRATEGIES,
  NzCarouselDotPosition,
  NzCarouselEffects,
  NzCarouselStrategyRegistryItem,
  PointerVector
} from './typings';

const NZ_CONFIG_COMPONENT_NAME = 'carousel';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-carousel',
  exportAs: 'nzCarousel',
  preserveWhitespaces: false,
  template: `
    <div class="slick-initialized slick-slider" [class.slick-vertical]="nzDotPosition === 'left' || nzDotPosition === 'right'">
      <div
        #slickList
        class="slick-list"
        tabindex="-1"
        (keydown)="onKeyDown($event)"
        (mousedown)="pointerDown($event)"
        (touchstart)="pointerDown($event)"
      >
        <!-- Render carousel items. -->
        <div class="slick-track" #slickTrack>
          <ng-content></ng-content>
        </div>
      </div>
      <!-- Render dots. -->
      <ul
        class="slick-dots"
        *ngIf="nzDots"
        [class.slick-dots-top]="nzDotPosition === 'top'"
        [class.slick-dots-bottom]="nzDotPosition === 'bottom'"
        [class.slick-dots-left]="nzDotPosition === 'left'"
        [class.slick-dots-right]="nzDotPosition === 'right'"
      >
        <li *ngFor="let content of carouselContents; let i = index" [class.slick-active]="content.isActive" (click)="goTo(i)">
          <ng-template [ngTemplateOutlet]="nzDotRender || renderDotTemplate" [ngTemplateOutletContext]="{ $implicit: i }"> </ng-template>
        </li>
      </ul>
    </div>

    <ng-template #renderDotTemplate let-index>
      <button>{{ index + 1 }}</button>
    </ng-template>
  `,
  host: {
    '[class.ant-carousel-vertical]': 'vertical'
  }
})
export class NzCarouselComponent implements AfterContentInit, AfterViewInit, OnDestroy, OnChanges {
  static ngAcceptInputType_nzEnableSwipe: BooleanInput;
  static ngAcceptInputType_nzDots: BooleanInput;
  static ngAcceptInputType_nzAutoPlay: BooleanInput;
  static ngAcceptInputType_nzAutoPlaySpeed: NumberInput;
  static ngAcceptInputType_nzTransitionSpeed: NumberInput;

  @ContentChildren(NzCarouselContentDirective) carouselContents!: QueryList<NzCarouselContentDirective>;

  @ViewChild('slickList', { static: false }) slickList?: ElementRef;
  @ViewChild('slickTrack', { static: false }) slickTrack?: ElementRef;

  @Input() nzDotRender?: TemplateRef<{ $implicit: number }>;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzEffect: NzCarouselEffects = 'scrollx';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzEnableSwipe: boolean = true;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzDots: boolean = true;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzAutoPlay: boolean = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputNumber() nzAutoPlaySpeed: number = 3000;
  @Input() @InputNumber() nzTransitionSpeed = 500;

  @Input()
  // @ts-ignore
  @WithConfig(NZ_CONFIG_COMPONENT_NAME)
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
  transitionInProgress: number | null = null;

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
    private readonly resizeService: NzResizeService,
    private readonly nzDragService: NzDragService,
    @Optional() @Inject(NZ_CAROUSEL_CUSTOM_STRATEGIES) private customStrategies: NzCarouselStrategyRegistryItem[]
  ) {
    this.nzDotPosition = 'bottom';

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
    this.slickListEl = this.slickList!.nativeElement;
    this.slickTrackEl = this.slickTrack!.nativeElement;

    this.carouselContents.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.markContentActive(0);
      this.syncStrategy();
    });

    this.resizeService
      .subscribe()
      .pipe(takeUntil(this.destroy$))
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
      this.strategy!.switch(this.activeIndex, index).subscribe(() => {
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
      this.strategy = new (customStrategy.strategy as NzSafeAny)(this, this.cdr, this.renderer);
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
   */
  pointerDown = (event: TouchEvent | MouseEvent) => {
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
