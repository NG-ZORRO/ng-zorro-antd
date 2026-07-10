import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';

import { nzCompactAlgorithm, nzDarkAlgorithm, NzThemeAlgorithm, NzThemeService } from 'ng-zorro-antd/core/theme';

export interface DemoCode {
  rawCode: string;
  highlightCode: string;
}

export const RESPONSIVE_XXS = 768;
export const RESPONSIVE_XS = 1120;
export const RESPONSIVE_SM = 1200;

export const SITE_DEFAULT_PRIMARY_COLOR = '#1890ff';

export interface SiteThemeState {
  dark: boolean;
  compact: boolean;
  primaryColor: string;
}

const DEFAULT_THEME_STATE: SiteThemeState = {
  dark: false,
  compact: false,
  primaryColor: SITE_DEFAULT_PRIMARY_COLOR
};

const THEME_STORAGE_KEY = 'site-theme-config';
const DARK_STYLESHEET_ID = 'site-theme-dark';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly http = inject(HttpClient);
  private readonly codeMap = new Map<string, DemoCode>();
  private readonly platform = inject(Platform);
  private readonly themeService = inject(NzThemeService);

  readonly directionality = inject(Directionality);
  readonly theme = signal<SiteThemeState>(DEFAULT_THEME_STATE);
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

  /** Applies a site theme change at runtime through the design-token engine. */
  setTheme(patch: Partial<SiteThemeState>): void {
    const state = { ...this.theme(), ...patch };
    this.theme.set(state);

    const algorithm: NzThemeAlgorithm[] = [];
    if (state.dark) {
      algorithm.push(nzDarkAlgorithm);
    }
    if (state.compact) {
      algorithm.push(nzCompactAlgorithm);
    }
    this.themeService.setTheme({ algorithm, token: { colorPrimary: state.primaryColor } });

    if (this.platform.isBrowser) {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(state));
      // Site chrome (header, footer, markdown) styles key off this attribute.
      document.body.setAttribute('data-theme', state.dark ? 'dark' : 'default');
      this.toggleDarkStylesheet(state.dark);
    }
  }

  /** Restores the theme picked in a previous visit. */
  initTheme(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        this.setTheme({ ...DEFAULT_THEME_STATE, ...JSON.parse(saved) });
      }
    } catch {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  }

  /**
   * The dark neutrals (backgrounds, borders, text) are not tokenized yet, so
   * dark mode additionally overlays a statically dark-compiled stylesheet.
   * It is inserted BEFORE the `<style nz-theme>` element: sizes and
   * primary/status colors inside it are still `var()` references, and the
   * runtime theme must keep winning the cascade for those.
   */
  private toggleDarkStylesheet(dark: boolean): void {
    const existing = document.getElementById(DARK_STYLESHEET_ID);
    if (!dark) {
      existing?.remove();
      return;
    }
    if (existing) {
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = DARK_STYLESHEET_ID;
    link.href = 'assets/dark.css';
    const runtimeTheme = document.head.querySelector('style[nz-theme]');
    document.head.insertBefore(link, runtimeTheme);
  }

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
