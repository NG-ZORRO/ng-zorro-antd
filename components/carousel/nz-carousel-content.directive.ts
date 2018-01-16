import {
  Directive,
  ElementRef,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[nz-carousel-content]',
  host: {
    '[class.slick-slide]': 'true'
  }
})
export class NzCarouselContentDirective {
  width = 0;
  isActive = false;
  left: number = null;
  top: number = null;
  fadeMode = false;
  nativeElement: HTMLElement;

  @HostBinding('class.slick-active')
  get setActiveClass(): boolean {
    return this.isActive === true;
  }

  @HostBinding('style.width.px')
  get setWidth(): number {
    return this.width;
  }

  @HostBinding('style.left.px')
  get setLeft(): number {
    return this.left;
  }

  @HostBinding('style.top.px')
  get setTop(): number {
    return this.top;
  }

  @HostBinding('style.position')
  get setPosition(): string {
    if (this.fadeMode) {
      return 'relative';
    }
  }

  @HostBinding('style.opacity')
  get setOpacity(): number {
    if (this.fadeMode) {
      return this.isActive ? 1 : 0;
    }
  }

  constructor(private _el: ElementRef) {
    this.nativeElement = this._el.nativeElement;
  }

}
