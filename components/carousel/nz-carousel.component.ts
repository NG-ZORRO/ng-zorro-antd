import { animate, style, AnimationAnimateMetadata, AnimationBuilder, AnimationFactory, AnimationMetadata } from '@angular/animations';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toBoolean, toNumber } from '../core/util/convert';
import { NzCarouselContentDirective } from './nz-carousel-content.directive';

export type SwipeDirection = 'swipeleft' | 'swiperight';

@Component({
  selector           : 'nz-carousel',
  preserveWhitespaces: false,
  templateUrl        : './nz-carousel.component.html',
  host               : {
    '[class.ant-carousel]': 'true'
  },
  styles             : [
    `
      :host {
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
export class NzCarouselComponent implements AfterViewInit, OnDestroy, AfterContentInit {
  private _autoPlay = false;
  private _autoPlaySpeed = 3000;
  private _dots = true;
  private _vertical = false;
  private _effect = 'scrollx';
  private unsubscribe$ = new Subject<void>();

  activeIndex = 0;
  transform = 'translate3d(0px, 0px, 0px)';
  timeout;

  @ContentChildren(NzCarouselContentDirective) slideContents: QueryList<NzCarouselContentDirective>;
  @ViewChild('slickList') slickList: ElementRef;
  @ViewChild('slickTrack') slickTrack: ElementRef;
  @Output() nzAfterChange: EventEmitter<number> = new EventEmitter();
  @Output() nzBeforeChange: EventEmitter<{ from: number; to: number }> = new EventEmitter();
  @Input() nzEnableSwipe = true;
  private preventSwipeInProgress = false;

  @HostListener('window:resize', [ '$event' ])
  onWindowResize(e: UIEvent): void {
    this.renderContent();
  }

  get nextIndex(): number {
    return this.activeIndex < this.slideContents.length - 1 ? (this.activeIndex + 1) : 0;
  }

  get prevIndex(): number {
    return this.activeIndex > 0 ? (this.activeIndex - 1) : (this.slideContents.length - 1);
  }

  @Input() nzDotRender: TemplateRef<{ $implicit: number }>;

  @Input()
  set nzDots(value: boolean) {
    this._dots = toBoolean(value);
  }

  get nzDots(): boolean {
    return this._dots;
  }

  @Input()
  set nzEffect(value: string) {
    this._effect = value;
    this.updateMode();
  }

  get nzEffect(): string {
    return this._effect;
  }

  @Input()
  set nzAutoPlay(value: boolean) {
    this._autoPlay = toBoolean(value);
    this.setUpAutoPlay();
  }

  get nzAutoPlay(): boolean {
    return this._autoPlay;
  }

  @Input()
  set nzAutoPlaySpeed(value: number) {
    this._autoPlaySpeed = toNumber(value, null);
    this.setUpAutoPlay();
  }

  get nzAutoPlaySpeed(): number {
    return this._autoPlaySpeed;
  }

  @Input()
  @HostBinding('class.ant-carousel-vertical')
  set nzVertical(value: boolean) {
    this._vertical = toBoolean(value);
    this.updateMode();
  }

  get nzVertical(): boolean {
    return this._vertical;
  }

  setActive(content: NzCarouselContentDirective, i: number): void {
    if (this.slideContents && this.slideContents.length) {
      this.setUpAutoPlay();
      const beforeIndex = this.slideContents.toArray().findIndex(slide => slide.isActive);
      this.nzBeforeChange.emit({ from: beforeIndex, to: i });
      this.activeIndex = i;
      const myAnimation: AnimationFactory = this.animationBuilder.build(
        NzCarouselComponent.createAnimations(beforeIndex, i, this.slideContents.length,
          this.elementRef.nativeElement.offsetWidth, this.elementRef.nativeElement.offsetHeight,
          this.nzEffect, this.nzVertical));
      const player = myAnimation.create(this.slickTrack.nativeElement);
      player.play();
      this.slideContents.forEach(slide => slide.isActive = slide === content);
      this.nzAfterChange.emit(i);
    }
  }
  /**
   * create slide switch animations
   */
  static createAnimations(fromIndex: number, toIndex: number, total: number, slideWidth: number, slideHeight: number,
                          effect: string = 'scrollx', vertical: boolean = false): AnimationAnimateMetadata[] {
    let animationSteps: AnimationAnimateMetadata[];
    if (effect === 'scrollx') {
      /**
       * decide the switch direction according to the distance,
       * always get the shortest switch path
       * if 2*Math.abs(fromIndex-toIndex)>total, the shortest path will cross the boundry,
       * animations are needed to make sure the switching looks smooth.
      */
      if (Math.abs(fromIndex - toIndex) * 2 > total) {
        /**
         * animations:
         * step1. move current slide half width/height slowly, towards the selected direction
         * step2. replace current slide to destination one quickly, with half width/height offset
         * step3. move destination slide to the correct postion slowly
         * done
         */
        let slideOffset1;
        let slideOffset2;
        if (fromIndex > toIndex) {
          slideOffset1 = -fromIndex - 0.5;
          slideOffset2 = -toIndex + 0.5;
        } else {
          slideOffset1 = -fromIndex + 0.5;
          slideOffset2 = -toIndex - 0.5;
        }
        animationSteps = [
          animate('250ms ease-in', style({transform: `translate3d(${vertical ? `0px, ${slideOffset1 * slideHeight}px, 0px` : `${slideOffset1 * slideWidth}px, 0px, 0px`})`})),
          animate('0.1ms', style({transform: `translate3d(${vertical ? `0px, ${slideOffset2 * slideHeight}px, 0px` : `${slideOffset2 * slideWidth}px, 0px, 0px`})`})),
          animate('250ms ease-in', style({transform: `translate3d(${vertical ? `0px, ${-toIndex * slideHeight}px, 0px` : `${-toIndex * slideWidth}px, 0px, 0px`})`}))
        ];
      } else {
        animationSteps = [
          animate('500ms ease-in', style({transform: `translate3d(${vertical ? `0px, ${-toIndex * slideHeight}px, 0px` : `${-toIndex * slideWidth}px, 0px, 0px`})`}))
        ];
      }
    } else {
      animationSteps = [
        animate('500ms ease-in', style({transform: `translate3d(0px, 0px, 0px)`}))
      ];
    }
    return animationSteps;
  }
  renderContent(): void {
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
        this.renderer.removeStyle(this.slickList.nativeElement, 'height');
        this.renderer.setStyle(this.slickList.nativeElement, 'height', `${this.slideContents.first.el.offsetHeight}px`);
        this.renderer.removeStyle(this.slickTrack.nativeElement, 'height');
        this.renderer.setStyle(this.slickTrack.nativeElement, 'height', `${this.slideContents.length * this.elementRef.nativeElement.offsetHeight}px`);
      } else {
        this.renderer.removeStyle(this.slickTrack.nativeElement, 'height');
        this.renderer.removeStyle(this.slickList.nativeElement, 'height');
        this.renderer.removeStyle(this.slickTrack.nativeElement, 'width');
        this.renderer.setStyle(this.slickTrack.nativeElement, 'width', `${this.slideContents.length * this.elementRef.nativeElement.offsetWidth}px`);
      }
      this.setUpAutoPlay();
    }
  }

  setUpAutoPlay(): void {
    this.clearTimeout();
    if (this.nzAutoPlay && this.nzAutoPlaySpeed > 0) {
      this.timeout = setTimeout(_ => {
        this.setActive(this.slideContents.toArray()[ this.nextIndex ], this.nextIndex);
      }, this.nzAutoPlaySpeed);
    }
  }

  updateMode(): void {
    if (this.slideContents && this.slideContents.length) {
      this.renderContent();
      this.setActive(this.slideContents.first, 0);
    }
  }

  clearTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  next(): void {
    this.setActive(this.slideContents.toArray()[ this.nextIndex ], this.nextIndex);
  }

  pre(): void {
    this.setActive(this.slideContents.toArray()[ this.prevIndex ], this.prevIndex);
  }

  goTo(index: number): void {
    if (index >= 0 && index <= this.slideContents.length - 1) {
      this.setActive(this.slideContents.toArray()[ index ], index);
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === 37) { // Left
      this.pre();
      e.preventDefault();
    } else if (e.keyCode === 39) { // Right
      this.next();
      e.preventDefault();
    }
  }

  swipe(action: SwipeDirection = 'swipeleft'): void {
    if (!this.nzEnableSwipe) { return; }
    this.preventSwipeInProgress = true;
    setTimeout(() => {this.preventSwipeInProgress = false; }, 1000);
    if (action === 'swipeleft') { this.next(); }
    if (action === 'swiperight') { this.pre(); }
  }

  /* tslint:disable:no-any */
  swipeInProgress(e: any): void {
    if (this.preventSwipeInProgress) { return; }
    if (this.nzEffect === 'scrollx') {
      const final = e.isFinal;
      const scrollWidth = final ? 0 : e.deltaX * 1.2;
      const totalWidth = this.elementRef.nativeElement.offsetWidth;
      const scrollPercent = scrollWidth / totalWidth;
      if (this.activeIndex > 0 || this.activeIndex < this.slideContents.length - 1 || Math.abs(scrollPercent) <= 0.5) {
        let animations: AnimationMetadata[] = [];
        if (this.nzVertical) {
          const totalHeight = this.elementRef.nativeElement.offsetHeight;
          const scrollHeight =  scrollPercent * totalHeight;
          animations = [animate('500ms ease-in', style({transform: `translate3d(0px, ${-this.activeIndex * totalHeight + scrollHeight}px, 0px)`}))];
        } else {
          animations = [animate('500ms ease-in', style({transform: `translate3d(${-this.activeIndex * totalWidth + scrollWidth}px, 0px, 0px)`}))];
        }
        const myAnimation: AnimationFactory = this.animationBuilder.build(animations);
        const player = myAnimation.create(this.slickTrack.nativeElement);
        player.play();
      }
    }
    if (e.isFinal) {
      this.setUpAutoPlay();
    } else {
      this.clearTimeout();
    }
  }

  constructor(public elementRef: ElementRef, private renderer: Renderer2, private animationBuilder: AnimationBuilder) {
  }

  ngAfterContentInit(): void {
    if (this.slideContents && this.slideContents.length) {
      this.slideContents.first.isActive = true;
    }
  }

  ngAfterViewInit(): void {
    this.setBackgroundColor();
    this.slideContents.changes
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.renderContent();
    });
    this.renderContent();
  }

  /**
   * set the carousel content's background color
   * this is to avoid a "white gap" during switching animations
   * especially for switching from last slide to the first one
   */
  private setBackgroundColor(): void {
    const firstSlide = this.slickTrack.nativeElement.querySelector('[nz-carousel-content]');
    if (firstSlide) {
      const backgroundColor = window.getComputedStyle(firstSlide).getPropertyValue('background-color');
      this.renderer.setStyle(this.slickList.nativeElement, 'backgroundColor', backgroundColor);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.clearTimeout();
  }

}
