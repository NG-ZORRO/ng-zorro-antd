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
  Signal,
  computed,
  WritableSignal,
  signal,
  InputSignalWithTransform,
  InputSignal
} from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { NZ_CONFIG, NzConfig, NzConfigKey } from './config';
import { registerTheme } from './css-variables';

function isDefined<T>(value?: T): value is Exclude<T, undefined> {
  return value !== undefined;
}

const defaultPrefixCls = 'ant';

@Injectable({
  providedIn: 'root'
})
export class NzConfigService {
  private configUpdated$ = new Subject<keyof NzConfig>();

  /**
   * Sharing config signals for all components, used for {@link withConfigFactory}
   * @internal
   * @todo use nested signal to refactor the whole config service
   */
  private readonly _configMap = new Map<NzConfigKey, WritableSignal<NzConfig[NzConfigKey]>>();

  /** Global config holding property. */
  private readonly config: NzConfig = inject(NZ_CONFIG, { optional: true }) || {};

  private readonly cspNonce: string | null = inject(CSP_NONCE, { optional: true });

  constructor() {
    if (this.config.theme) {
      // If theme is set with NZ_CONFIG, register theme to make sure css variables work
      registerTheme(this.getConfig().prefixCls?.prefixCls || defaultPrefixCls, this.config.theme, this.cspNonce);
    }
  }

  private _getConfigValue<T extends NzConfigKey>(componentName: T): WritableSignal<NzConfig[T]> {
    let configValue = this._configMap.get(componentName) as WritableSignal<NzConfig[T]>;
    if (configValue) {
      return configValue;
    }

    configValue = signal(this.config[componentName]);
    this._configMap.set(componentName, configValue);
    return configValue;
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
    this._configMap.get(componentName)?.set(this.config[componentName]);
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
  if (typeof ngDevMode !== 'undefined' && ngDevMode) {
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

/**
 * Generate a `withConfig` function for a specific component, which would try to load default value from `NZ_CONFIG`
 * if the `input` property is not assigned by user.
 *
 * @param componentName The name of component (as defined in {@link NzConfigKey}) to listen for config changes.
 * @example
 * ```ts
 * const withConfig = withConfigFactory('button');
 *
 * class ExampleComponent {
 *   readonly nzSize = input<NzButtonSize>('default');
 *   protected readonly size = withConfig('nzSize', this.nzSize);
 * }
 * ```
 */
export function withConfigFactory<T extends NzConfigKey>(componentName: T) {
  /**
   * @param name The name of input property.
   * @param inputSignal The input signal.
   * @param defaultValue The default value.
   */
  return <N extends keyof NonNullable<NzConfig[T]>, V = NonNullable<NzConfig[T]>[N]>(
    name: N,
    inputSignal: InputSignal<V | undefined> | InputSignalWithTransform<V | undefined, unknown>,
    defaultValue: V
  ): Signal<V> => {
    const configValueSignal = inject(NzConfigService)['_getConfigValue'](componentName);

    return computed<V>(() => {
      const configValue = configValueSignal()?.[name] as V | undefined;
      const inputValue = inputSignal();
      // if the version of the inputSignal is 0 or the inputValue is undefined, we consider it as not assigned by user
      const assignedByUser = inputSignal[SIGNAL].version > 0 && isDefined(inputValue);

      if (assignedByUser) {
        return inputValue;
      }

      if (isDefined(configValue)) {
        return configValue;
      }

      return defaultValue;
    });
  };
}
