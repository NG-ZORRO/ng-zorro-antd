import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { isNotNil } from '../core/util/check';

@Directive({
  selector: '[nz-carousel-content]'
})
export class NzCarouselContentDirective implements OnInit {
  el: HTMLElement = this.elementRef.nativeElement;

  private _active = false;
  private _width: number = 0;
  private _left: number | null;
  private _top: number | null;
  private _fadeMode = false;

  set width(value: number) {
    this._width = value;
    this.renderer.setStyle(this.el, 'width', `${this.width}px`);
  }

  get width(): number {
    return this._width;
  }

  set left(value: number | null) {
    this._left = value;
    if (isNotNil(this.left)) {
      this.renderer.setStyle(this.el, 'left', `${this.left}px`);
    } else {
      this.renderer.removeStyle(this.el, 'left');
    }
  }

  get left(): number | null {
    return this._left;
  }

  set top(value: number | null) {
    this._top = value;
    if (isNotNil(this.top)) {
      this.renderer.setStyle(this.el, 'top', `${this.top}px`);
    } else {
      this.renderer.removeStyle(this.el, 'top');
    }
  }

  get top(): number | null {
    return this._top;
  }

  set isActive(value: boolean) {
    this._active = value;
    this.updateOpacity();
    if (this.isActive) {
      this.renderer.addClass(this.el, 'slick-active');
    } else {
      this.renderer.removeClass(this.el, 'slick-active');
    }
  }

  get isActive(): boolean {
    return this._active;
  }

  set fadeMode(value: boolean) {
    this._fadeMode = value;
    if (this.fadeMode) {
      this.renderer.setStyle(this.el, 'position', 'relative');
    } else {
      this.renderer.removeStyle(this.el, 'position');
    }
    this.updateOpacity();
  }

  get fadeMode(): boolean {
    return this._fadeMode;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'slick-slide');
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.el, 'transition', 'opacity 500ms ease');
  }

  private updateOpacity(): void {
    if (this.fadeMode) {
      this.renderer.setStyle(this.el, 'opacity', this.isActive ? 1 : 0);
    }
  }
}
