/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

/**
 * hack the bug
 * angular router change with unexpected transition trigger after calling applicationRef.attachView
 * https://github.com/angular/angular/issues/34718
 */
@Directive({
  selector: '[nz-button],nz-button-group,[nz-icon]'
})
export class NzTransitionPatchDirective implements AfterViewInit {
  readonly nativeElement: HTMLElement | null = null;
  private readonly hiddenAttribute: string | null = null;
  getHiddenAttribute(element: HTMLElement): string | null {
    if (this.platform.isBrowser) {
      return element.getAttribute('hidden');
    } else {
      return null;
    }
  }
  getHiddenAttributeCount(attribute: string | null): number {
    if (attribute === null) {
      return 0;
    } else if (typeof +attribute === 'number' && !isNaN(+attribute)) {
      return +attribute;
    } else {
      return 1;
    }
  }
  setHiddenAttribute(element: HTMLElement): void {
    const increasedHiddenAttribute = this.getHiddenAttributeCount(this.getHiddenAttribute(element)) + 1;
    this.renderer.setAttribute(element, 'hidden', `${increasedHiddenAttribute}`);
  }
  restoreHiddenAttribute(element: HTMLElement, originHiddenAttribute: string | null): void {
    const decreasedHiddenAttribute = this.getHiddenAttributeCount(this.getHiddenAttribute(element)) - 1;
    if (decreasedHiddenAttribute === 0) {
      this.renderer.removeAttribute(element, 'hidden');
    } else if (decreasedHiddenAttribute === 1) {
      this.renderer.setAttribute(element, 'hidden', originHiddenAttribute || '');
    } else {
      this.renderer.setAttribute(element, 'hidden', `${decreasedHiddenAttribute}`);
    }
  }

  constructor(elementRef: ElementRef, private renderer: Renderer2, private platform: Platform) {
    this.nativeElement = elementRef.nativeElement;
    this.hiddenAttribute = this.getHiddenAttribute(this.nativeElement!);
    this.setHiddenAttribute(this.nativeElement!);
  }
  ngAfterViewInit(): void {
    this.restoreHiddenAttribute(this.nativeElement!, this.hiddenAttribute);
  }
}
