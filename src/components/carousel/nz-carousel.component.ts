import {
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
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../util/convert';
import { NzCarouselContentDirective } from './nz-carousel-content.directive';

@Component({
  selector     : 'nz-carousel',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="slick-initialized slick-slider" [class.slick-vertical]="nzVertical">
      <div class="slick-list" #slickList>
        <div class="slick-track" style="opacity: 1;" [style.transform]="transform" #slickTrack>
          <ng-content></ng-content>
        </div>
      </div>
      <ul class="slick-dots" style="display: block;" *ngIf="nzDots">
        <li [class.slick-active]="content.isActive" *ngFor="let content of slideContents; let i =index" (click)="setActive(content,i)">
          <button>1</button>
        </li>
      </ul>
    </div>`,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ],
  host: {
    '[class.ant-carousel]': 'true'
  }
})
export class NzCarouselComponent implements AfterViewInit, OnDestroy {
  private _autoPlay = false;
  private _dots = true;
  private _vertical = false;
  private _pauseOnHover = true;
  activeIndex = 0;
  transform = 'translate3d(0px, 0px, 0px)';
  interval;
  slideContents: QueryList<NzCarouselContentDirective>;
  _autoPlaySpeed = 3000;
  _mouseHover = false;
  @ContentChildren(NzCarouselContentDirective)
  set _slideContents(value: QueryList<NzCarouselContentDirective>) {
    this.slideContents = value;
    this.renderContent();
  }

  @ViewChild('slickList') slickList: ElementRef;
  @ViewChild('slickTrack') slickTrack: ElementRef;
  @HostBinding('class.ant-carousel') _nzCarousel = true;
  @Input() nzEffect = 'scrollx';
  @Output() nzAfterChange: EventEmitter<number> = new EventEmitter();
  @Output() nzBeforeChange: EventEmitter<{form: number; to: number}> = new EventEmitter();
  @Input()
  get nzAutoPlaySpeed(): number {
    return this._autoPlaySpeed;
  }

  set nzAutoPlaySpeed(speed: number) {
    // css transition speed is 500ms
    this._autoPlaySpeed = Math.max(speed, 500);
  }

  @HostListener('mouseenter')
  _onMouseenter(): void {
    this._mouseHover = true;
    if (this.nzAutoPlay && this.nzPauseOnHover) {
      this.clearInterval();
    }
  }

  @HostListener('mouseleave')
  _onMouseleave(): void {
    this._mouseHover = false;
    if (!this.interval && this.nzAutoPlay) {
      this.createInterval();
    }
  }

  get _nextIndex(): number {
    return this.activeIndex < this.slideContents.length - 1 ? (this.activeIndex + 1) : 0;
  }

  get _prevIndex(): number {
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

  constructor(public hostElement: ElementRef, private _renderer: Renderer2) {
  }

  setActive(content: NzCarouselContentDirective, i: number): void {
    if ((this.nzAutoPlay && !this.nzPauseOnHover) || (this.nzAutoPlay && this.nzPauseOnHover && !this._mouseHover)) {
      this.createInterval();
    }
    const beforeIndex = this.slideContents.toArray().findIndex(slide => slide.isActive);
    this.nzBeforeChange.emit({ form: beforeIndex, to: i });
    this.activeIndex = i;
    if (this.nzEffect !== 'fade') {
      if (!this.nzVertical) {
        this.transform = `translate3d(${-this.activeIndex * this.hostElement.nativeElement.offsetWidth}px, 0px, 0px)`;
      } else {
        this.transform = `translate3d(0px, ${-this.activeIndex * this.hostElement.nativeElement.offsetHeight}px, 0px)`;
      }
    }
    this.slideContents.forEach(slide => slide.isActive = false);
    content.isActive = true;
    this.nzAfterChange.emit(i);
  }

  ngAfterViewInit(): void {
    this.renderContent();
  }

  renderContent(): void {
    setTimeout(_ => {
      if (this.slideContents.first) {
        this.slideContents.first.isActive = true;
      }
      this.slideContents.forEach((content, i) => {
        content.width = this.hostElement.nativeElement.offsetWidth;
        if (this.nzEffect === 'fade') {
          content.fadeMode = true;
          if (!this.nzVertical) {
            content.left = -i * content.width;
          } else {
            content.top = -i * this.hostElement.nativeElement.offsetHeight;
          }
        }
      });
      if (this.nzAutoPlay) {
        this.createInterval();
      }

      if (this.nzVertical) {
        this._renderer.removeStyle(this.slickList.nativeElement, 'height');
        if (this.slideContents.first) {
          this._renderer.setStyle(this.slickList.nativeElement, 'height', `${this.slideContents.first.nativeElement.offsetHeight}px`);
        }
        this._renderer.removeStyle(this.slickTrack.nativeElement, 'height');
        this._renderer.setStyle(this.slickTrack.nativeElement, 'height', `${this.slideContents.length * this.hostElement.nativeElement.offsetHeight}px`);
      } else {
        this._renderer.removeStyle(this.slickTrack.nativeElement, 'width');
        this._renderer.setStyle(this.slickTrack.nativeElement, 'width', `${this.slideContents.length * this.hostElement.nativeElement.offsetWidth}px`);
      }
    });
  }

  createInterval(): void {
    this.clearInterval();
    this.interval = setInterval(_ => {
      this.setActive(this.slideContents.toArray()[this._nextIndex], this._nextIndex);
    }, this.nzAutoPlaySpeed);
  }

  clearInterval(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  nzSlickNext(): void {
    this.setActive(this.slideContents.toArray()[this._nextIndex], this._nextIndex);
  }

  nzSlickPrev(): void {
    this.setActive(this.slideContents.toArray()[this._prevIndex], this._prevIndex);
  }

  nzSlickGoTo(index: number): void {
    if (index >= 0 && index <= this.slideContents.length - 1) {
      this.setActive(this.slideContents.toArray()[index], index);
    }
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

}
