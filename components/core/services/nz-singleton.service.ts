/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// tslint:disable no-any

import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

interface SingletonRegistryItem {
  refCount: number;
  target: any;
}

const testRegistry = new Map<string, SingletonRegistryItem>();

/**
 * Some singletons should have lifecycle that is same to Angular's. This service make sure that
 * those singletons get destroyed in HMR.
 */
@Injectable({
  providedIn: 'root'
})
export class NzSingletonService {
  private get singletonRegistry(): Map<string, SingletonRegistryItem> {
    return environment.isTestMode ? testRegistry : this._singletonRegistry;
  }

  private _singletonRegistry = new Map<string, SingletonRegistryItem>();

  registerSingletonWithKey(key: string, target: any): void {
    const alreadyHas = this.singletonRegistry.has(key);
    const item: SingletonRegistryItem = alreadyHas ? this.singletonRegistry.get(key)! : this.withNewTarget(target);

    item.refCount += 1;

    if (!alreadyHas) {
      this.singletonRegistry.set(key, item);
    }
  }

  getSingletonWithKey<T>(key: string): T | null {
    return this.singletonRegistry.has(key) ? (this.singletonRegistry.get(key)!.target as T) : null;
  }

  private withNewTarget(target: any): SingletonRegistryItem {
    return {
      target,
      refCount: 0
    };
  }
}
