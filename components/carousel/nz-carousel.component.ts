import {
  AfterContentInit,
  ChangeDetectorRef,
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
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { toBoolean } from '../core/util/convert';

import { NzCarouselContentDirective } from './nz-carousel-content.directive';

@Component({
  selector           : 'nz-carousel',
  preserveWhitespaces: false,
  template           : `
    <div class="slick-initialized slick-slider" [class.slick-vertical]="nzVertical">
      <div class="slick-list" #slickList tabindex="-1" (keydown)="onKeyDown($event)">
        <div class="slick-track" [style.transform]="transform" #slickTrack>
          <ng-content></ng-content>
        </div>
      </div>
      <ul class="slick-dots" *ngIf="nzDots">
        <li [class.slick-active]="content.isActive" *ngFor="let content of slideContents; let i =index" (click)="setActive(content,i)">
          <button>{{i + 1}}</button>
        </li>
      </ul>
    </div>`,
  host               : {
    '[class.ant-carousel]': 'true'
  },
  styles             : [
      `
      :host {
        display: block;
        position: relative;
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
export class NzCarouselComponent implements AfterContentInit, OnDestroy {
  private _autoPlay = false;
  private _dots = true;
  private _vertical = false;
  private _pauseOnHover = true;
  private _autoPlaySpeed = 3000;
  slideContentsSubscription: Subscription;
  activeIndex = 0;
  transform = 'translate3d(0px, 0px, 0px)';
  interval;
  isMouseHover = false;

  @ContentChildren(NzCarouselContentDirective) slideContents: QueryList<NzCarouselContentDirective>;
  @ViewChild('slickList') slickList: ElementRef;
  @ViewChild('slickTrack') slickTrack: ElementRef;
  @Input() nzEffect = 'scrollx';
  @Output() nzAfterChange: EventEmitter<number> = new EventEmitter();
  @Output() nzBeforeChange: EventEmitter<{ from: number; to: number }> = new EventEmitter();

  @Input()
  get nzAutoPlaySpeed(): number {
    return this._autoPlaySpeed;
  }

  set nzAutoPlaySpeed(speed: number) {
    // css transition speed is 500ms
    this._autoPlaySpeed = Math.max(speed, 500);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isMouseHover = true;
    if (this.nzAutoPlay && this.nzPauseOnHover) {
      this.clearInterval();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isMouseHover = false;
    if (!this.interval && this.nzAutoPlay) {
      this.createInterval();
    }
  }

  get nextIndex(): number {
    return this.activeIndex < this.slideContents.length - 1 ? (this.activeIndex + 1) : 0;
  }

  get prevIndex(): number {
    return this.activeIndex > 0 ? (this.activeIndex - 1) : (this.slideContents.length - 1);
  }

  @Input()
  set nzPauseOnHover(value: boolean) {
    this._pauseOnHover = toBoolean(value);
  }

  get nzPauseOnHover(): boolean {
    return this._pauseOnHover;
  }

  @Input()
  set nzDots(value: boolean) {
    this._dots = toBoolean(value);
  }

  get nzDots(): boolean {
    return this._dots;
  }

  @Input()
  set nzAutoPlay(value: boolean) {
    this._autoPlay = toBoolean(value);
  }

  get nzAutoPlay(): boolean {
    return this._autoPlay;
  }

  @Input()
  @HostBinding('class.ant-carousel-vertical')
  set nzVertical(value: boolean) {
    this._vertical = toBoolean(value);
  }

  get nzVertical(): boolean {
    return this._vertical;
  }

  setActive(content: NzCarouselContentDirective, i: number): void {
    if ((this.nzAutoPlay && !this.nzPauseOnHover) || (this.nzAutoPlay && this.nzPauseOnHover && !this.isMouseHover)) {
      this.createInterval();
    }
    const beforeIndex = this.slideContents.toArray().findIndex(slide => slide.isActive);
    this.nzBeforeChange.emit({ from: beforeIndex, to: i });
    this.activeIndex = i;
    if (this.nzEffect !== 'fade') {
      if (!this.nzVertical) {
        this.transform = `translate3d(${-this.activeIndex * this.elementRef.nativeElement.offsetWidth}px, 0px, 0px)`;
      } else {
        this.transform = `translate3d(0px, ${-this.activeIndex * this.elementRef.nativeElement.offsetHeight}px, 0px)`;
      }
    }
    this.slideContents.forEach(slide => slide.isActive = false);
    content.isActive = true;
    this.nzAfterChange.emit(i);
  }

  renderContent(): void {
    if (this.slideContents.first) {
      this.slideContents.first.isActive = true;
    }
    this.slideContents.forEach((content, i) => {
      content.width = this.elementRef.nativeElement.offsetWidth;
      if (this.nzEffect === 'fade') {
        content.fadeMode = true;
        if (!this.nzVertical) {
          content.left = -i * content.width;
        } else {
          content.top = -i * this.elementRef.nativeElement.offsetHeight;
        }
      }
    });
    if (this.nzAutoPlay) {
      this.createInterval();
    }
    if (this.nzVertical) {
      this.renderer.removeStyle(this.slickList.nativeElement, 'height');
      if (this.slideContents.first) {
        this.renderer.setStyle(this.slickList.nativeElement, 'height', `${this.slideContents.first.el.offsetHeight}px`);
      }
      this.renderer.removeStyle(this.slickTrack.nativeElement, 'height');
      this.renderer.setStyle(this.slickTrack.nativeElement, 'height', `${this.slideContents.length * this.elementRef.nativeElement.offsetHeight}px`);
    } else {
      this.renderer.removeStyle(this.slickTrack.nativeElement, 'width');
      this.renderer.setStyle(this.slickTrack.nativeElement, 'width', `${this.slideContents.length * this.elementRef.nativeElement.offsetWidth}px`);
    }
  }

  createInterval(): void {
    this.clearInterval();
    this.interval = setInterval(_ => {
      this.setActive(this.slideContents.toArray()[ this.nextIndex ], this.nextIndex);
    }, this.nzAutoPlaySpeed);
  }

  clearInterval(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
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

  constructor(public elementRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    this.renderContent();
    this.slideContentsSubscription = this.slideContents.changes.subscribe(() => {
      this.renderContent();
    });
  }

  ngOnDestroy(): void {
    if (this.slideContentsSubscription) {
      this.slideContentsSubscription.unsubscribe();
      this.slideContentsSubscription = null;
    }
    this.clearInterval();
  }

}
