/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

/** Type for week day index (0 = Sunday, 1 = Monday, etc.) */
export type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Configuration for date-related features. */
export interface NzDateConfig {
  /** Customize the first day of a week. */
  firstDayOfWeek?: WeekDayIndex;
}

/** Injection token for date configuration. */
export const NZ_DATE_CONFIG = new InjectionToken<NzDateConfig>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-date-config' : ''
);

/** Injection token for date locale (should be a date-fns Locale object). */
export const NZ_DATE_LOCALE = new InjectionToken<unknown>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-date-locale' : ''
);

/** Default date configuration. */
export const NZ_DATE_CONFIG_DEFAULT: NzDateConfig = {
  firstDayOfWeek: undefined
};

/** Merges user config with default config. */
export function mergeDateConfig(config: NzDateConfig | null): NzDateConfig {
  return { ...NZ_DATE_CONFIG_DEFAULT, ...config };
}
