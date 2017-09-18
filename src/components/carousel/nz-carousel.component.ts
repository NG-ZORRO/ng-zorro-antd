import {
  Component,
  ContentChildren,
  ViewChild,
  HostBinding,
  AfterViewInit,
  Renderer2,
  OnDestroy,
  Input,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';
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
  ]
})
export class NzCarouselComponent implements AfterViewInit, OnDestroy {
  activeIndex = 0;
  transform = 'translate3d(0px, 0px, 0px)';
  interval;
  slideContents;

  @ContentChildren(NzCarouselContentDirective)
  set _slideContents(value) {
    this.slideContents = value;
    this.renderContent();
  }

  @ViewChild('slickList') slickList: ElementRef;
  @ViewChild('slickTrack') slickTrack: ElementRef;
  @Input() nzAutoPlay = false;
  @Input() nzDots = true;
  @Input() nzEffect = 'scrollx';
  @Input() @HostBinding('class.ant-carousel-vertical') nzVertical = false;
  @HostBinding('class.ant-carousel') _nzCarousel = true;

  constructor(public hostElement: ElementRef, private _renderer: Renderer2) {
  }

  setActive(content, i) {
    if (this.nzAutoPlay) {
      this.createInterval();
    }
    this.activeIndex = i;
    if (this.nzEffect !== 'fade') {
      if (!this.nzVertical) {
        this.transform = `translate3d(${-this.activeIndex * this.hostElement.nativeElement.offsetWidth}px, 0px, 0px)`;
      } else {
        this.transform = `translate3d(0px, ${-this.activeIndex * this.hostElement.nativeElement.offsetHeight}px, 0px)`;
      }
    }
    this.slideContents.forEach(slide => {
      slide.isActive = false;
    });
    content.isActive = true;
  }

  ngAfterViewInit() {
    this.renderContent();
  }

  renderContent() {
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
    })
  }

  createInterval() {
    this.clearInterval();
    this.interval = setInterval(_ => {
      if (this.activeIndex < this.slideContents.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
      this.setActive(this.slideContents.toArray()[ this.activeIndex ], this.activeIndex);
    }, 3000);
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  ngOnDestroy() {
    this.clearInterval();
  }

}
