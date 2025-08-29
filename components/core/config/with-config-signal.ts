/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DestroyRef, Signal, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs/operators';

import { NzConfig, NzConfigKey } from './config';
import { NzConfigService } from './config.service';

export interface WithConfigSignalOptions<T> {
  userInput: Signal<T>;
  moduleName: NzConfigKey;
  propertyName: keyof NzConfig[NzConfigKey];
}

/**
 * alternative solution of `@WithConfig` decorator for signal
 * @param options WithConfigSignalOptions
 * @returns
 */
export function withConfigSignal<T>(options: WithConfigSignalOptions<T>): Signal<T> {
  const destroyRef = inject(DestroyRef);
  const nzConfigService = inject(NzConfigService);
  const { userInput, moduleName, propertyName } = options;
  const originValue = userInput();
  const configValue = signal<T | undefined>(undefined);

  const updateConfigValue = (): void => {
    const config = nzConfigService.getConfigForComponent(moduleName);
    const value = config?.[propertyName as keyof typeof config] as T | undefined;
    configValue.set(value);
  };

  // config listener
  nzConfigService
    .getConfigChangeEventForComponent(moduleName)
    .pipe(startWith(void 0), takeUntilDestroyed(destroyRef))
    .subscribe(() => {
      updateConfigValue();
    });

  return computed(() => {
    const user = userInput();
    const config = configValue();

    if (user !== undefined) {
      return user;
    }

    if (config !== undefined) {
      return config;
    }

    return originValue;
  });
}
