import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { NgClassInterface } from '../types/ng-class';

@Injectable()
export class NzUpdateHostClassService {
  private classMap = {};
  private renderer: Renderer2;

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

  private addClass(el: HTMLElement, classMap: NgClassInterface, renderer: Renderer2): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i)) {
        if (classMap[i]) {
          renderer.addClass(el, i);
        }
      }
    }
  }

  constructor(rendererFactory2: RendererFactory2) {
    this.renderer = rendererFactory2.createRenderer(null, null);
  }
}
