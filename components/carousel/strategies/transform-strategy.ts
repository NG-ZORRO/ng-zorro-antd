/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NzCarouselContentDirective } from '../carousel-content.directive';
import { NzCarouselComponentAsSource, PointerVector } from '../typings';
import { NzCarouselBaseStrategy } from './base-strategy';

interface NzCarouselTransformStrategyOptions {
  direction: 'left' | 'right';
}

export class NzCarouselTransformStrategy extends NzCarouselBaseStrategy<NzCarouselTransformStrategyOptions> {
  private isDragging = false;
  private isTransitioning = false;

  private get vertical(): boolean {
    return this.carouselComponent!.vertical;
  }

  constructor(
    carouselComponent: NzCarouselComponentAsSource,
    cdr: ChangeDetectorRef,
    renderer: Renderer2,
    platform: Platform,
    options?: NzCarouselTransformStrategyOptions
  ) {
    super(carouselComponent, cdr, renderer, platform, options);
  }

  override dispose(): void {
    super.dispose();
    this.renderer.setStyle(this.slickTrackEl, 'transform', null);
  }

  override withCarouselContents(contents: QueryList<NzCarouselContentDirective> | null): void {
    super.withCarouselContents(contents);

    const carousel = this.carouselComponent!;
    const activeIndex = carousel.activeIndex;

    // We only do when we are in browser.
    if (this.platform.isBrowser && this.contents.length) {
      this.renderer.setStyle(this.slickListEl, 'height', `${this.unitHeight}px`);

      if (this.vertical) {
        this.renderer.setStyle(this.slickTrackEl, 'width', `${this.unitWidth}px`);
        this.renderer.setStyle(this.slickTrackEl, 'height', `${this.length * this.unitHeight}px`);
        this.renderer.setStyle(
          this.slickTrackEl,
          'transform',
          `translate3d(0, ${-activeIndex * this.unitHeight}px, 0)`
        );
      } else {
        this.renderer.setStyle(this.slickTrackEl, 'height', `${this.unitHeight}px`);
        this.renderer.setStyle(this.slickTrackEl, 'width', `${this.length * this.unitWidth}px`);
        this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-activeIndex * this.unitWidth}px, 0, 0)`);
      }

      this.contents.forEach((content: NzCarouselContentDirective) => {
        this.renderer.setStyle(content.el, 'position', 'relative');
        this.renderer.setStyle(content.el, 'width', `${this.unitWidth}px`);
        this.renderer.setStyle(content.el, 'height', `${this.unitHeight}px`);
      });
    }
  }

  switch(_f: number, _t: number): Observable<void> {
    const { to: t } = this.getFromToInBoundary(_f, _t);
    const complete$ = new Subject<void>();

    this.renderer.setStyle(
      this.slickTrackEl,
      'transition',
      `transform ${this.carouselComponent!.nzTransitionSpeed}ms ease`
    );

    if (this.vertical) {
      this.verticalTransform(_f, _t);
    } else {
      this.horizontalTransform(_f, _t);
    }

    this.isTransitioning = true;
    this.isDragging = false;

    // TODO: use transitionEnd event instead of setTimeout
    setTimeout(() => {
      this.renderer.setStyle(this.slickTrackEl, 'transition', null);
      this.contents.forEach((content: NzCarouselContentDirective) => {
        this.renderer.setStyle(content.el, this.vertical ? 'top' : 'left', null);
      });

      if (this.vertical) {
        this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-t * this.unitHeight}px, 0)`);
      } else {
        this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-t * this.unitWidth}px, 0, 0)`);
      }

      this.isTransitioning = false;

      complete$.next();
      complete$.complete();
    }, this.carouselComponent!.nzTransitionSpeed);

    return complete$.asObservable();
  }

  override dragging(_vector: PointerVector): void {
    if (this.isTransitioning) {
      return;
    }

    const activeIndex = this.carouselComponent!.activeIndex;

    if (this.carouselComponent!.vertical) {
      if (!this.isDragging && this.length > 2) {
        if (activeIndex === this.maxIndex) {
          this.prepareVerticalContext(true);
        } else if (activeIndex === 0) {
          this.prepareVerticalContext(false);
        }
      }
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(0, ${-activeIndex * this.unitHeight + _vector.x}px, 0)`
      );
    } else {
      if (!this.isDragging && this.length > 2) {
        if (activeIndex === this.maxIndex) {
          this.prepareHorizontalContext(true);
        } else if (activeIndex === 0) {
          this.prepareHorizontalContext(false);
        }
      }
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(${-activeIndex * this.unitWidth + _vector.x}px, 0, 0)`
      );
    }

    this.isDragging = true;
  }

  private verticalTransform(_f: number, _t: number): void {
    const { from: f, to: t } = this.getFromToInBoundary(_f, _t);
    const needToAdjust = this.length > 2 && _t !== t;

    if (needToAdjust) {
      this.prepareVerticalContext(t < f);
      this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-_t * this.unitHeight}px, 0)`);
    } else {
      this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-t * this.unitHeight}px, 0`);
    }
  }

  private horizontalTransform(_f: number, _t: number): void {
    const { from: f, to: t } = this.getFromToInBoundary(_f, _t);
    const needToAdjust = this.length > 2 && _t !== t;

    if (needToAdjust) {
      this.prepareHorizontalContext(t < f);
      this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-_t * this.unitWidth}px, 0, 0)`);
    } else {
      this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-t * this.unitWidth}px, 0, 0`);
    }
  }

  private prepareVerticalContext(lastToFirst: boolean): void {
    if (lastToFirst) {
      this.renderer.setStyle(this.firstEl, 'top', `${this.length * this.unitHeight}px`);
      this.renderer.setStyle(this.lastEl, 'top', null);
    } else {
      this.renderer.setStyle(this.firstEl, 'top', null);
      this.renderer.setStyle(this.lastEl, 'top', `${-this.unitHeight * this.length}px`);
    }
  }

  private prepareHorizontalContext(lastToFirst: boolean): void {
    if (lastToFirst) {
      this.renderer.setStyle(this.firstEl, 'left', `${this.length * this.unitWidth}px`);
      this.renderer.setStyle(this.lastEl, 'left', null);
    } else {
      this.renderer.setStyle(this.firstEl, 'left', null);
      this.renderer.setStyle(this.lastEl, 'left', `${-this.unitWidth * this.length}px`);
    }
  }
}
