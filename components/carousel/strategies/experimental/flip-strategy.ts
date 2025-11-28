/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { QueryList } from '@angular/core';
import { type Observable, Subject } from 'rxjs';

import { NzCarouselContentDirective } from '../../carousel-content.directive';
import { NzCarouselBaseStrategy } from '../base-strategy';

export class NzCarouselFlipStrategy extends NzCarouselBaseStrategy {
  override withCarouselContents(contents: QueryList<NzCarouselContentDirective> | null): void {
    super.withCarouselContents(contents);

    if (this.contents) {
      this.renderer.setStyle(this.slickListEl, 'width', `${this.unitWidth}px`);
      this.renderer.setStyle(this.slickTrackEl, 'width', `${this.length * this.unitWidth}px`);

      this.contents.forEach((content: NzCarouselContentDirective, i: number) => {
        const cur = this.carouselComponent!.activeIndex === i;

        this.renderer.setStyle(content.el, 'transform', cur ? 'rotateY(0deg)' : 'rotateY(180deg)');
        this.renderer.setStyle(content.el, 'position', 'relative');
        this.renderer.setStyle(content.el, 'width', `${this.unitWidth}px`);
        this.renderer.setStyle(content.el, 'left', `${-this.unitWidth * i}px`);
        this.renderer.setStyle(content.el, 'transform-style', 'preserve-3d');
        this.renderer.setStyle(content.el, 'backface-visibility', 'hidden');
      });

      const { carouselComponent } = this;
      carouselComponent!.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.contents.forEach(c => this.renderer.setStyle(c.el, 'transition', ['transform 500ms ease 0s']));
        }, carouselComponent!.nzTransitionSpeed);
      });
    }
  }

  switch(rawF: number, rawT: number): Observable<void> {
    const { from, to } = this.getFromToInBoundary(rawF, rawT);
    const complete$ = new Subject<void>();
    const speed = this.carouselComponent!.nzTransitionSpeed;

    setTimeout(() => {
      complete$.next();
      complete$.complete();
    }, speed);

    if (rawF === rawT) {
      return complete$;
    }

    this.contents.forEach((content: NzCarouselContentDirective, i: number) => {
      if (i === from) {
        this.renderer.setStyle(content.el, 'transform', 'rotateY(180deg)');
      } else if (i === to) {
        this.renderer.setStyle(content.el, 'transform', 'rotateY(0deg)');
      }
    });

    return complete$.asObservable();
  }

  override dispose(): void {
    this.contents.forEach((content: NzCarouselContentDirective) => {
      this.renderer.setStyle(content.el, 'transition', null);
      this.renderer.setStyle(content.el, 'transform', null);
      this.renderer.setStyle(content.el, 'width', null);
      this.renderer.setStyle(content.el, 'left', null);
      this.renderer.setStyle(content.el, 'transform-style', null);
      this.renderer.setStyle(content.el, 'backface-visibility', null);
    });

    super.dispose();
  }
}
