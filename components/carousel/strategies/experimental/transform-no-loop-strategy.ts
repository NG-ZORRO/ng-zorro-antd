/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NzCarouselContentDirective } from '../../carousel-content.directive';
import { NzCarouselComponentAsSource, PointerVector } from '../../typings';
import { NzCarouselBaseStrategy } from '../base-strategy';

interface NzCarouselTransformOnLoopStrategyOptions {
  direction: 'left' | 'right';
}

/**
 * this strategy is very much like NzCarouselTransformStrategy, but it doesn't loop between the first and the last one
 */
export class NzCarouselTransformNoLoopStrategy extends NzCarouselBaseStrategy<NzCarouselTransformOnLoopStrategyOptions> {
  private isTransitioning = false;

  private get vertical(): boolean {
    return this.carouselComponent!.vertical;
  }

  constructor(
    carouselComponent: NzCarouselComponentAsSource,
    cdr: ChangeDetectorRef,
    renderer: Renderer2,
    platform: Platform,
    options?: NzCarouselTransformOnLoopStrategyOptions
  ) {
    super(carouselComponent, cdr, renderer, platform, options);
  }

  override dispose(): void {
    this.renderer.setStyle(this.slickTrackEl, 'transform', null);

    super.dispose();
  }

  override withCarouselContents(contents: QueryList<NzCarouselContentDirective> | null): void {
    super.withCarouselContents(contents);

    const carousel = this.carouselComponent!;
    const activeIndex = carousel.activeIndex;

    if (this.platform.isBrowser && this.contents.length) {
      this.renderer.setStyle(this.slickListEl, 'height', `${this.unitHeight}px`);

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
          this.renderer.setStyle(
            this.slickTrackEl,
            'transform',
            `translate3d(${-activeIndex * this.unitWidth}px, 0, 0)`
          );
        }

        this.contents.forEach((content: NzCarouselContentDirective) => {
          this.renderer.setStyle(content.el, 'position', 'relative');
          this.renderer.setStyle(content.el, 'width', `${this.unitWidth}px`);
          this.renderer.setStyle(content.el, 'height', `${this.unitHeight}px`);
        });
      }
    }
  }

  switch(_f: number, _t: number): Observable<void> {
    const to = (_t + this.length) % this.length;
    const transitionSpeed = this.carouselComponent!.nzTransitionSpeed;
    const complete$ = new Subject<void>();

    this.renderer.setStyle(this.slickTrackEl, 'transition', `transform ${transitionSpeed}ms ease`);

    if (this.vertical) {
      this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-to * this.unitHeight}px, 0)`);
    } else {
      this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-to * this.unitWidth}px, 0, 0)`);
    }

    this.isTransitioning = true;

    setTimeout(() => {
      // this strategy don't need to do a following adjust
      this.isTransitioning = false;

      complete$.next();
      complete$.complete();
    }, transitionSpeed);

    return complete$.asObservable();
  }

  override dragging(vector: PointerVector): void {
    if (this.isTransitioning) {
      return;
    }

    const activeIndex = this.carouselComponent!.activeIndex;

    if (this.vertical) {
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(0, ${-activeIndex * this.unitHeight + vector.x}px, 0)`
      );
    } else {
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(${-activeIndex * this.unitWidth + vector.x}px, 0, 0)`
      );
    }
  }
}
