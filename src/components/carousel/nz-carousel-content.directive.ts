import {
  Directive,
  HostBinding,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[nz-carousel-content]',
})
export class NzCarouselContentDirective {
  width = 0;
  isActive = false;
  left = null;
  top = null;
  fadeMode = false
  nativeElement: HTMLElement;


  @HostBinding('class.slick-slide') _nzSlickSlide = true;

  @HostBinding('class.slick-active')
  get setActiveClass() {
    return this.isActive === true;
  }

  @HostBinding('style.width.px')
  get setWidth() {
    return this.width;
  }

  @HostBinding('style.left.px')
  get setLeft() {
    return this.left;
  }

  @HostBinding('style.top.px')
  get setTop() {
    return this.top;
  }

  @HostBinding('style.position')
  get setPosition() {
    if (this.fadeMode) {
      return 'relative';
    }
  }

  @HostBinding('style.opacity')
  get setOpacity() {
    if (this.fadeMode) {
      return this.isActive ? 1 : 0;
    }
  }

  constructor(private _el: ElementRef) {
    this.nativeElement = this._el.nativeElement;
  }

}
