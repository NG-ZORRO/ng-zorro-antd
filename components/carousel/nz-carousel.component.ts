import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
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
        <li
          *ngFor="let content of slideContents; let i =index"
          [class.slick-active]="content.isActive"
          (click)="setActive(content,i)">
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
export class NzCarouselComponent implements AfterViewInit, OnDestroy, AfterContentInit {
  private _autoPlay = false;
  private _dots = true;
  private _vertical = false;
  private _effect = 'scrollx';
  slideContentsSubscription: Subscription;
  activeIndex = 0;
  transform = 'translate3d(0px, 0px, 0px)';
  timeout;

  @ContentChildren(NzCarouselContentDirective) slideContents: QueryList<NzCarouselContentDirective>;
  @ViewChild('slickList') slickList: ElementRef;
  @ViewChild('slickTrack') slickTrack: ElementRef;
  @Output() nzAfterChange: EventEmitter<number> = new EventEmitter();
  @Output() nzBeforeChange: EventEmitter<{ from: number; to: number }> = new EventEmitter();

  get nextIndex(): number {
    return this.activeIndex < this.slideContents.length - 1 ? (this.activeIndex + 1) : 0;
  }

  get prevIndex(): number {
    return this.activeIndex > 0 ? (this.activeIndex - 1) : (this.slideContents.length - 1);
  }

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
      if (this.nzEffect === 'scrollx') {
        if (this.nzVertical) {
          this.transform = `translate3d(0px, ${-this.activeIndex * this.elementRef.nativeElement.offsetHeight}px, 0px)`;
        } else {
          this.transform = `translate3d(${-this.activeIndex * this.elementRef.nativeElement.offsetWidth}px, 0px, 0px)`;
        }
      } else {
        this.transform = 'translate3d(0px, 0px, 0px)';
      }
      this.slideContents.forEach(slide => slide.isActive = slide === content);
      this.nzAfterChange.emit(i);
    }
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
    if (this.nzAutoPlay) {
      this.timeout = setTimeout(_ => {
        this.setActive(this.slideContents.toArray()[ this.nextIndex ], this.nextIndex);
      }, 3000);
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

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngAfterContentInit(): void {
    if (this.slideContents && this.slideContents.length) {
      this.slideContents.first.isActive = true;
    }
  }

  ngAfterViewInit(): void {
    this.slideContentsSubscription = this.slideContents.changes.subscribe(() => {
      this.renderContent();
    });
    this.renderContent();
  }

  ngOnDestroy(): void {
    if (this.slideContentsSubscription) {
      this.slideContentsSubscription.unsubscribe();
      this.slideContentsSubscription = null;
    }
    this.clearTimeout();
  }

}
