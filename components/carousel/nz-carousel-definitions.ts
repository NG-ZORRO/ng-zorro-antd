import { QueryList } from '@angular/core';
import { NzCarouselContentDirective } from './nz-carousel-content.directive';

export type NzCarouselEffects = 'fade' | 'scrollx';

export interface NzCarouselComponentAsSource {
  carouselContents: QueryList<NzCarouselContentDirective>;
  el: HTMLElement;
  nzTransitionSpeed: number;
  nzVertical: boolean;
  slickListEl: HTMLElement;
  slickTrackEl: HTMLElement;
  activeIndex: number;
}

export interface PointerVector {
  x: number;
  y: number;
}

export interface FromToInterface {
  from: number;
  to: number;
}
