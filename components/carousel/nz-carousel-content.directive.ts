import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nz-carousel-content]',
  exportAs: 'nzCarouselContent'
})
export class NzCarouselContentDirective {
  el: HTMLElement = this.elementRef.nativeElement;

  set isActive(value: boolean) {
    this._active = value;
    if (this.isActive) {
      this.renderer.addClass(this.el, 'slick-active');
    } else {
      this.renderer.removeClass(this.el, 'slick-active');
    }
  }

  get isActive(): boolean {
    return this._active;
  }

  private _active = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'slick-slide');
  }
}
