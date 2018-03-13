import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class NzUpdateHostClassService {
  private classMap = {};

  updateHostClass(el: HTMLElement, classMap: object): void {
    this.removeClass(el, this.classMap, this.renderer);
    this.classMap = { ...classMap };
    this.addClass(el, this.classMap, this.renderer);
  }

  private removeClass(el: HTMLElement, classMap: object, renderer: Renderer2): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i)) {
        renderer.removeClass(el, i);
      }
    }
  }

  private addClass(el: HTMLElement, classMap: object, renderer: Renderer2): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i)) {
        if (classMap[ i ]) {
          renderer.addClass(el, i);
        }
      }
    }
  }

  constructor(private renderer: Renderer2) {

  }
}
