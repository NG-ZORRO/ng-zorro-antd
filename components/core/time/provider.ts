/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, Provider, Type } from '@angular/core';

import { NzDateAdapter } from './date-adapter';
import { DateFnsDateAdapter } from './date-fns-adapter';

/**
 * Injection token to configure which NzDateAdapter implementation to use.
 * If not provided, DateFnsDateAdapter is used as the default.
 */
export const NZ_DATE_ADAPTER = new InjectionToken<NzDateAdapter<unknown>>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-date-adapter' : ''
);

/**
 * Default provider that registers {@link DateFnsDateAdapter} as the {@link NzDateAdapter} implementation.
 * This should be included in the application's root providers.
 *
 * Usage:
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideNzDateAdapter()]
 * };
 *
 * // To use a custom adapter:
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideNzDateAdapter(JalaliDateAdapter)]
 * };
 * ```
 */
export function provideNzDateAdapter(adapterClass?: Type<NzDateAdapter<unknown>>): Provider[] {
  const adapter = adapterClass ?? DateFnsDateAdapter;

  return [{ provide: NzDateAdapter, useClass: adapter }];
}
