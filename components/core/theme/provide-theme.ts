/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  provideEnvironmentInitializer
} from '@angular/core';

import { NzThemeConfig } from './interfaces';
import { NzThemeService } from './theme.service';

export const NZ_THEME = new InjectionToken<NzThemeConfig>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-theme' : ''
);

/**
 * Enables the design-token theming system: tokens are resolved from the given
 * config and emitted as CSS custom properties in a `<style nz-theme>` element.
 * Meant to be used together with the `ng-zorro-antd.token.css` stylesheet.
 *
 * ```ts
 * provideNzTheme({ token: { colorPrimary: '#00b96b' }, algorithm: nzDarkAlgorithm })
 * ```
 */
export function provideNzTheme(config?: NzThemeConfig): EnvironmentProviders;
export function provideNzTheme(factory: () => NzThemeConfig): EnvironmentProviders;
export function provideNzTheme(config: NzThemeConfig | (() => NzThemeConfig) = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    typeof config === 'function' ? { provide: NZ_THEME, useFactory: config } : { provide: NZ_THEME, useValue: config },
    // Eager so the style element exists during server-side rendering and is
    // serialized into the delivered HTML.
    provideEnvironmentInitializer(() => void inject(NzThemeService))
  ]);
}
