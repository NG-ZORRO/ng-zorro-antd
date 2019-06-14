/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// tslint:disable no-any

import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { filter, mapTo } from 'rxjs/operators';
import { NzConfig, NZ_CONFIG } from './config';

@Injectable({
  providedIn: 'root'
})
export class NzConfigService {
  private configUpdated$ = new Subject<keyof NzConfig>();

  /** Global config holding property. */
  config: NzConfig;

  constructor(@Optional() @Inject(NZ_CONFIG) defaultConfig?: NzConfig) {
    this.config = defaultConfig || {};
  }

  getDefaultConfig(componentName: keyof NzConfig, propName: string): any {
    const componentConfig: any = this.config[componentName] || {};
    return componentConfig[propName] || null;
  }

  getConfigChangeEventForComponent(componentName: keyof NzConfig): Observable<void> {
    return this.configUpdated$.pipe(
      filter(n => n === componentName),
      mapTo(undefined)
    );
  }

  set(componentName: keyof NzConfig, value?: any): void {
    this.config[componentName] = { ...this.config[componentName], ...(value || {}) };
    this.configUpdated$.next(componentName);
  }

  setCompleteConfig(config: NzConfig): void {
    this.config = { ...config };
    this.configUpdated$.next();
  }
}

// tslint:disable:no-invalid-this
// tslint:disable:no-any

/**
 * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
 * config.
 */
// tslint:disable-next-line:typedef
export function WithConfig<T>(componentName: keyof NzConfig, innerDefaultValue?: T) {
  return function ConfigDecorator(
    target: any,
    propName: string,
    originalDescriptor?: TypedPropertyDescriptor<any>
  ): any {
    const privatePropName = `$$__assignedValue__${propName}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(`The prop "${privatePropName}" is already exist, it will be override by ${name} decorator.`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true
    });

    return {
      get(): T {
        const originalValue =
          originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
        // To every component that supports global config should have a public property called `nzConfigService` injected.
        const config = this.nzConfigService.config[componentName];
        const configValue = config ? config[propName] : undefined;
        const defaultValue = configValue !== undefined ? configValue : innerDefaultValue;
        return originalValue || defaultValue;
      },
      set(value?: T): void {
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set.bind(this)(value);
        } else {
          this[privatePropName] = value;
        }
      },
      configurable: true,
      enumerable: true
    };
  };
}
