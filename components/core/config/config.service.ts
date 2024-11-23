/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CSP_NONCE, Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NZ_CONFIG, NzConfig, NzConfigKey } from './config';
import { registerTheme } from './css-variables';

const isDefined = function (value?: NzSafeAny): boolean {
  return value !== undefined;
};

const defaultPrefixCls = 'ant';

@Injectable({
  providedIn: 'root'
})
export class NzConfigService {
  private configUpdated$ = new Subject<keyof NzConfig>();

  /** Global config holding property. */
  private readonly config: NzConfig = inject(NZ_CONFIG, { optional: true }) || {};

  private readonly cspNonce: string | null = inject(CSP_NONCE, { optional: true });

  constructor() {
    if (this.config.theme) {
      // If theme is set with NZ_CONFIG, register theme to make sure css variables work
      registerTheme(this.getConfig().prefixCls?.prefixCls || defaultPrefixCls, this.config.theme, this.cspNonce);
    }
  }

  getConfig(): NzConfig {
    return this.config;
  }

  getConfigForComponent<T extends NzConfigKey>(componentName: T): NzConfig[T] {
    return this.config[componentName];
  }

  getConfigChangeEventForComponent(componentName: NzConfigKey): Observable<void> {
    return this.configUpdated$.pipe(
      filter(n => n === componentName),
      map(() => undefined)
    );
  }

  set<T extends NzConfigKey>(componentName: T, value: NzConfig[T]): void {
    this.config[componentName] = { ...this.config[componentName], ...value };
    if (componentName === 'theme' && this.config.theme) {
      registerTheme(this.getConfig().prefixCls?.prefixCls || defaultPrefixCls, this.config.theme, this.cspNonce);
    }
    this.configUpdated$.next(componentName);
  }
}

/**
 * This decorator is used to decorate class field. If a class field is decorated and unassigned, it would try to load default value from `NZ_CONFIG`
 *
 * @note that the class must have `_nzModuleName`({@link NzConfigKey}) property.
 * @example
 * ```ts
 * class ExampleComponent {
 *   private readonly _nzModuleName: NzConfigKey = 'button';
 *   @WithConfig() size: string = 'default';
 * }
 * ```
 */
export function WithConfig<This, Value>() {
  return function (_value: undefined, context: ClassFieldDecoratorContext<This, Value>) {
    context.addInitializer(function () {
      const nzConfigService = inject(NzConfigService);
      const originalValue = this[context.name as keyof This];

      let value: Value;
      let assignedByUser = false;

      Object.defineProperty(this, context.name, {
        get: () => {
          const configValue = nzConfigService.getConfigForComponent(
            this['_nzModuleName' as keyof This] as NzConfigKey
          )?.[context.name as keyof NzConfig[NzConfigKey]];

          if (assignedByUser) {
            return value;
          }

          if (isDefined(configValue)) {
            return configValue;
          }

          return originalValue;
        },
        set: (newValue: Value) => {
          // if the newValue is undefined, we also consider it as not assigned by user
          assignedByUser = isDefined(newValue);
          value = newValue;
        },
        enumerable: true,
        configurable: true
      });
    });
  };
}
