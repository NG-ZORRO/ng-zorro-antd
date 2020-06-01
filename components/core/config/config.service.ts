/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Subject } from 'rxjs';

import { filter, mapTo } from 'rxjs/operators';

import { NZ_CONFIG, NzConfig, NzConfigKey } from './config';

const isDefined = function (value?: NzSafeAny): boolean {
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

/**
 * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
 * config.
 */
// tslint:disable-next-line:typedef
export function WithConfig<T>(componentName: NzConfigKey) {
  return function ConfigDecorator(target: NzSafeAny, propName: NzSafeAny, originalDescriptor?: TypedPropertyDescriptor<T>): NzSafeAny {
    const privatePropName = `$$__assignedValue__${propName}`;

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true,
      enumerable: false
    });

    return {
      get(): T | undefined {
        const originalValue = originalDescriptor?.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
        const assignedByUser = (this.assignmentCount[propName] || 0) > 1;

        if (assignedByUser && isDefined(originalValue)) {
          return originalValue;
        }

        const componentConfig = this.nzConfigService.getConfigForComponent(componentName) || {};
        const configValue = componentConfig[propName];
        const ret = isDefined(configValue) ? configValue : originalValue;

        return ret;
      },
      set(value?: T): void {
        // If the value is assigned, we consider the newly assigned value as 'assigned by user'.
        this.assignmentCount = this.assignmentCount || {};
        this.assignmentCount[propName] = (this.assignmentCount[propName] || 0) + 1;

        if (originalDescriptor?.set) {
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
