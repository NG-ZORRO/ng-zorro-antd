import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
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
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { InputBoolean, InputNumber } from '../core/util/convert';
import { NzCarouselContentDirective } from './nz-carousel-content.directive';

export type NzCarouselEffects = 'fade' | 'scrollx';

export type SwipeDirection = 'swipeleft' | 'swiperight';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-carousel',
  preserveWhitespaces: false,
  templateUrl        : './nz-carousel.component.html',
  host               : {
    '[class.ant-carousel]'         : 'true',
    '[class.ant-carousel-vertical]': 'nzVertical'
  },
  styles             : [
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
        transition: all 0.5s ease;
      }

      .slick-slide {
        transition: opacity 500ms ease;
      }
    `
  ]
})
export class NzCarouselComponent implements AfterViewInit, AfterContentInit, OnDestroy, OnChanges {
  @ContentChildren(NzCarouselContentDirective) slideContents: QueryList<NzCarouselContentDirective>;
  @ViewChild('slickList') slickList: ElementRef;
  @ViewChild('slickTrack') slickTrack: ElementRef;

  @Input() nzTransitionSpeed = 500; // Not exposed.
  @Input() nzDotRender: TemplateRef<{ $implicit: number }>;
  @Input() nzEffect: NzCarouselEffects = 'scrollx';
  @Input() @InputBoolean() nzEnableSwipe = true;
  @Input() @InputBoolean() nzDots: boolean = true;
  @Input() @InputBoolean() nzVertical: boolean = false;
  @Input() @InputBoolean() nzAutoPlay = false;
  @Input() @InputNumber() nzAutoPlaySpeed = 3000; // Should be nzAutoPlayDuration, but changing this is breaking.

  @Output() readonly nzAfterChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly nzBeforeChange: EventEmitter<{ from: number; to: number }> = new EventEmitter();

  activeIndex = 0;
  transform = 'translate3d(0px, 0px, 0px)';
  transitionAction;

  private subs_ = new Subscription();

  get nextIndex(): number {
    return this.activeIndex < this.slideContents.length - 1 ? (this.activeIndex + 1) : 0;
  }

  get prevIndex(): number {
    return this.activeIndex > 0 ? (this.activeIndex - 1) : (this.slideContents.length - 1);
  }

  constructor(public elementRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
  }

  ngAfterContentInit(): void {
    if (this.slideContents && this.slideContents.length) {
      this.slideContents.first.isActive = true;
    }
  }

  ngAfterViewInit(): void {
    // Re-render when content changes.
    this.subs_.add(this.slideContents.changes.subscribe(() => {
      this.renderContent();
    }));

    this.ngZone.runOutsideAngular(() => {
      this.subs_.add(fromEvent(window, 'resize').pipe(debounceTime(50)).subscribe(() => {
        this.renderContent();
        this.setTransition();
      }));
    });

    // When used in modals (drawers maybe too), it should render itself asynchronously.
    // Refer to https://github.com/NG-ZORRO/ng-zorro-antd/issues/2387
    Promise.resolve().then(() => {
      this.renderContent();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzAutoPlay || changes.nzAutoPlaySpeed) {
      this.setUpNextScroll();
    }
    if (changes.nzEffect) {
      this.updateMode();
    }
  }

  ngOnDestroy(): void {
    this.subs_.unsubscribe();
    this.clearTimeout();
  }

  setContentActive(index: number): void {
    if (this.slideContents && this.slideContents.length) {
      this.nzBeforeChange.emit({ from: this.slideContents.toArray().findIndex(slide => slide.isActive), to: index });
      this.activeIndex = index;
      this.setTransition();
      this.slideContents.forEach((slide, i) => slide.isActive = index === i);
      this.setUpNextScroll();
      this.cdr.markForCheck();
      // Should trigger the following when animation is done. The transition takes 0.5 seconds according to the CSS.
      setTimeout(() => this.nzAfterChange.emit(index), this.nzTransitionSpeed);
    }
  }

  private setTransition(): void {
    this.transform = this.nzEffect === 'fade'
      ? 'translate3d(0px, 0px, 0px)'
      : this.nzVertical
        // `Scrollx` mode.
        ? `translate3d(0px, ${-this.activeIndex * this.elementRef.nativeElement.offsetHeight}px, 0px)`
        : `translate3d(${-this.activeIndex * this.elementRef.nativeElement.offsetWidth}px, 0px, 0px)`;
  }

  next(): void {
    this.setContentActive(this.nextIndex);
  }

  pre(): void {
    this.setContentActive(this.prevIndex);
  }

  goTo(index: number): void {
    if (index >= 0 && index <= this.slideContents.length - 1) {
      this.setContentActive(index);
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === LEFT_ARROW) { // Left
      this.pre();
      e.preventDefault();
    } else if (e.keyCode === RIGHT_ARROW) { // Right
      this.next();
      e.preventDefault();
    }
  }

  swipe(action: SwipeDirection = 'swipeleft'): void {
    if (!this.nzEnableSwipe) {
      return;
    }
    if (action === 'swipeleft') {
      this.next();
    }
    if (action === 'swiperight') {
      this.pre();
    }
  }

  /* tslint:disable-next-line:no-any */
  swipeInProgress(e: any): void {
    if (this.nzEffect === 'scrollx') {
      const final = e.isFinal;
      const scrollWidth = final ? 0 : e.deltaX * 1.2;
      const totalWidth = this.elementRef.nativeElement.offsetWidth;
      if (this.nzVertical) {
        const totalHeight = this.elementRef.nativeElement.offsetHeight;
        const scrollPercent = scrollWidth / totalWidth;
        const scrollHeight = scrollPercent * totalHeight;
        this.transform = `translate3d(0px, ${-this.activeIndex * totalHeight + scrollHeight}px, 0px)`;
      } else {
        this.transform = `translate3d(${-this.activeIndex * totalWidth + scrollWidth}px, 0px, 0px)`;
      }
    }
    if (e.isFinal) {
      this.setUpNextScroll();
    } else {
      this.clearTimeout();
    }
  }

  clearTimeout(): void {
    if (this.transitionAction) {
      clearTimeout(this.transitionAction);
      this.transitionAction = null;
    }
  }

  /**
   * Make a carousel scroll to `this.nextIndex` after `this.nzAutoPlaySpeed` milliseconds.
   */
  private setUpNextScroll(): void {
    this.clearTimeout();
    if (this.nzAutoPlay && this.nzAutoPlaySpeed > 0) {
      this.transitionAction = setTimeout(() => {
        this.setContentActive(this.nextIndex);
      }, this.nzAutoPlaySpeed);
    }
  }

  private updateMode(): void {
    if (this.slideContents && this.slideContents.length) {
      this.renderContent();
      this.setContentActive(0);
    }
  }

  private renderContent(): void {
    if (this.slideContents && this.slideContents.length) {
      this.slideContents.forEach((content, i) => {
        content.width = this.elementRef.nativeElement.offsetWidth;
        if (this.nzEffect === 'fade') {
          content.fadeMode = true;
          if (this.nzVertical) {
            content.top = -i * this.elementRef.nativeElement.offsetHeight;
          } else {
            content.left = -i * content.width;
          }
        } else {
          content.fadeMode = false;
          content.left = null;
          content.top = null;
        }
      });
      if (this.nzVertical) {
        this.renderer.removeStyle(this.slickTrack.nativeElement, 'width');
        this.renderer.removeStyle(this.slickList.nativeElement, 'width');
        this.renderer.setStyle(this.slickList.nativeElement, 'height', `${this.slideContents.first.el.offsetHeight}px`);
        this.renderer.setStyle(this.slickTrack.nativeElement, 'height', `${this.slideContents.length * this.elementRef.nativeElement.offsetHeight}px`);
      } else {
        this.renderer.removeStyle(this.slickTrack.nativeElement, 'height');
        this.renderer.removeStyle(this.slickList.nativeElement, 'height');
        this.renderer.removeStyle(this.slickTrack.nativeElement, 'width'); // This is necessary to prevent carousel items to overflow.
        this.renderer.setStyle(this.slickTrack.nativeElement, 'width', `${this.slideContents.length * this.elementRef.nativeElement.offsetWidth}px`);
      }
      this.setUpNextScroll();
      this.cdr.markForCheck();
    }
  }
}
