/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  CSP_NONCE,
  DestroyRef,
  Injectable,
  afterNextRender,
  assertInInjectionContext,
  inject,
  InputSignal,
  Signal,
  computed
} from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NZ_CONFIG, NzConfig, NzConfigKey } from './config';
import { registerTheme } from './css-variables';

const isDefined = function (value?: NzSafeAny): boolean {
  return value !== undefined;
};

const defaultPrefixCls = 'ant';

// todo: use nested signal to refactor the whole config service

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

  getConfigForComponentChange<T extends NzConfigKey>(componentName: T): Observable<NzConfig[T]> {
    return this.configUpdated$.pipe(
      filter(n => n === componentName),
      map(() => this.getConfigForComponent(componentName))
    );
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
 * Subscribes to configuration change events for a specific NZ component after the next render cycle.
 *
 * This utility is intended for use within Angular injection contexts and handles automatic
 * unsubscription via `DestroyRef`. It returns a cleanup function that can be manually called
 * to unsubscribe early if needed.
 *
 * @param componentName - The name of the component (as defined in `NzConfigKey`) to listen for config changes.
 * @param callback - A function to invoke when the component's configuration changes.
 * @returns A cleanup function that destroys the post-render effect and unsubscribes from the config event.
 *
 * @throws If called outside of an Angular injection context (in dev mode).
 */
export function onConfigChangeEventForComponent(componentName: NzConfigKey, callback: () => void): () => void {
  if (ngDevMode) {
    assertInInjectionContext(onConfigChangeEventForComponent);
  }

  const destroyRef = inject(DestroyRef);
  const nzConfigService = inject(NzConfigService);
  let subscription: Subscription | null = null;

  const ref = afterNextRender(() => {
    subscription = nzConfigService
      .getConfigChangeEventForComponent(componentName)
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(callback);
  });

  return () => {
    ref.destroy();
    subscription?.unsubscribe();
  };
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
  if (ngDevMode) {
    assertInInjectionContext(WithConfig);
  }

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

type SignalValue<T> = T extends Signal<infer U> ? U : T;

/**
 * This decorator is used to decorate class field as an inner state of a bounding `input` field.
 * It would try to load default value from `NZ_CONFIG` if the `input` property is not assigned by user.
 *
 * @param name The name of the target input property.
 * @note that the class must have `_nzModuleName`({@link NzConfigKey}) property. And the target input property should be defined with `input` function rather than `@Input` decorator
 * @example
 * ```ts
 * class ExampleComponent {
 *   private readonly _nzModuleName: NzConfigKey = 'button';
 *   readonly nzSize = input<NzButtonSize>('default');
 *
 *   @WithConfigSignal('nzSize')
 *   readonly size: WritableSignal<NzButtonSize>;
 * }
 * ```
 */
export function WithConfigSignal<This, Value extends Signal<T>, T = SignalValue<Value>>(name: keyof This) {
  if (ngDevMode) {
    assertInInjectionContext(WithConfigSignal);
  }

  return function (_value: undefined, context: ClassFieldDecoratorContext<This, Value>) {
    context.addInitializer(function () {
      const nzConfigService = inject(NzConfigService);
      const inputSignal = this[name] as InputSignal<T>;
      const originalValue = inputSignal();
      const configKey = this['_nzModuleName' as keyof This] as NzConfigKey;
      const configValueSignal = toSignal<T | undefined>(
        nzConfigService
          .getConfigForComponentChange(configKey)
          .pipe(map(config => config?.[name as keyof NzConfig[NzConfigKey]]))
      );

      const value = computed<T>(() => {
        const configValue = configValueSignal();
        const inputValue = inputSignal();
        // if the version of the inputSignal is 0 or the inputValue is undefined, we consider it as not assigned by user
        const assignedByUser = inputSignal[SIGNAL].version > 0 && isDefined(inputValue);

        if (assignedByUser) {
          return inputValue;
        } else if (configValue !== undefined) {
          return configValue;
        }

        return originalValue;
      });

      Object.defineProperty(this, context.name, {
        get: () => value,
        enumerable: true,
        configurable: false
      });
    });
  };
}
