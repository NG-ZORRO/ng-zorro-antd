import { Injectable } from '@angular/core';
import { matchMedia } from '../polyfill/match-media';

@Injectable()
export class NzMatchMediaService {
  matchMedia(mediaQuery: string): MediaQueryList {
    return matchMedia(mediaQuery);
  }
}
