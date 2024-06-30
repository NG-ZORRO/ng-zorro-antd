/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';

import { environment } from 'ng-zorro-antd/core/environments';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

interface SingletonRegistryItem {
  target: NzSafeAny;
}

/**
 * When running in test, singletons should not be destroyed. So we keep references of singletons
 * in this global variable.
 */
const testSingleRegistry = new Map<string, SingletonRegistryItem>();

/**
 * Some singletons should have life cycle that is same to Angular's. This service make sure that
 * those singletons get destroyed in HMR.
 */
@Injectable({
  providedIn: 'root'
})
export class NzSingletonService {
  private get singletonRegistry(): Map<string, SingletonRegistryItem> {
    return environment.isTestMode ? testSingleRegistry : this._singletonRegistry;
  }

  /**
   * This registry is used to register singleton in dev mode.
   * So that singletons get destroyed when hot module reload happens.
   *
   * This works in prod mode too but with no specific effect.
   */
  private _singletonRegistry = new Map<string, SingletonRegistryItem>();

  registerSingletonWithKey(key: string, target: NzSafeAny): void {
    const alreadyHave = this.singletonRegistry.has(key);
    const item: SingletonRegistryItem = alreadyHave ? this.singletonRegistry.get(key)! : this.withNewTarget(target);

    if (!alreadyHave) {
      this.singletonRegistry.set(key, item);
    }
  }

  unregisterSingletonWithKey(key: string): void {
    if (this.singletonRegistry.has(key)) {
      this.singletonRegistry.delete(key);
    }
  }

  getSingletonWithKey<T>(key: string): T | null {
    return this.singletonRegistry.has(key) ? (this.singletonRegistry.get(key)!.target as T) : null;
  }

  private withNewTarget(target: NzSafeAny): SingletonRegistryItem {
    return {
      target
    };
  }
}
