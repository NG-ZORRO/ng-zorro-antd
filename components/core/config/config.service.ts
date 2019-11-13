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

import { NzConfig, NzConfigKey, NZ_CONFIG } from './config';

const isDefined = function(value?: any): boolean {
  return value !== undefined;
};

@Injectable({
  providedIn: 'root'
})
export class NzConfigService {
  private configUpdated$ = new Subject<keyof NzConfig>();

  /** Global config holding property. */
  private config: NzConfig;

  constructor(@Optional() @Inject(NZ_CONFIG) defaultConfig?: NzConfig) {
    this.config = defaultConfig || {};
  }

  getConfigForComponent<T extends NzConfigKey>(componentName: T): NzConfig[T] {
    return this.config[componentName];
  }

  getConfigChangeEventForComponent(componentName: NzConfigKey): Observable<void> {
    return this.configUpdated$.pipe(
      filter(n => n === componentName),
      mapTo(undefined)
    );
  }

  set<T extends NzConfigKey>(componentName: T, value: NzConfig[T]): void {
    this.config[componentName] = { ...this.config[componentName], ...value };
    this.configUpdated$.next(componentName);
  }
}

// tslint:disable:no-invalid-this
// tslint:disable:no-any

/**
 * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
 * config.
 */
// tslint:disable-next-line:typedef
export function WithConfig<T>(componentName: NzConfigKey, innerDefaultValue?: T) {
  return function ConfigDecorator(target: any, propName: any, originalDescriptor?: TypedPropertyDescriptor<T>): any {
    const privatePropName = `$$__assignedValue__${propName}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(
        `The prop "${privatePropName}" is already exist, it will be override by ${componentName} decorator.`
      );
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true,
      enumerable: false
    });

    return {
      get(): T | undefined {
        const originalValue =
          originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];

        if (isDefined(originalValue)) {
          return originalValue;
        }

        const componentConfig = this.nzConfigService.getConfigForComponent(componentName) || {};
        const configValue = componentConfig[propName];

        return isDefined(configValue) ? configValue : innerDefaultValue;
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
