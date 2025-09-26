import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Directionality } from '@angular/cdk/bidi';

export interface DemoCode {
  rawCode: string;
  highlightCode: string;
}

export const RESPONSIVE_XXS = 768;
export const RESPONSIVE_XS = 1120;
export const RESPONSIVE_SM = 1200;

export type SiteTheme = 'default' | 'dark' | 'compact' | 'aliyun';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly http = inject(HttpClient);
  private readonly codeMap = new Map<string, DemoCode>();

  readonly directionality = inject(Directionality);
  readonly theme = signal<SiteTheme>('default');
  readonly windowWidth = signal(1400);
  /**
   * When the screen size is smaller than 768 pixel, show the drawer and hide
   * the navigation on the side.
   **/
  readonly isMobile = computed(() => this.windowWidth() <= RESPONSIVE_XXS);
  readonly responsive = computed(() => {
    if (this.windowWidth() < RESPONSIVE_XS) {
      return 'crowded';
    } else if (this.windowWidth() < RESPONSIVE_SM) {
      return 'narrow';
    }
    return null;
  });

  getCode(componentId: string): Observable<DemoCode> {
    if (this.codeMap.has(componentId)) {
      return of(this.codeMap.get(componentId)!);
    }

    const path = componentId.startsWith('components-') ? componentId.split('components-')[1] : componentId;
    return this.http
      .get<DemoCode>(`assets/codes/${path}.json`, { responseType: 'json' })
      .pipe(tap(data => this.codeMap.set(componentId, data)));
  }
}
