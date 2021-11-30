/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FactoryProvider, Inject, InjectionToken, Optional, SkipSelf, ValueProvider } from '@angular/core';

export const ANTD_PREFIX = new InjectionToken<string>('ANTD_PREFIX_TOKEN');

function PrefixFactory(defaultPrefix: string): (prefix: string) => string {
  return prefix => (prefix ? prefix : defaultPrefix);
}

export function PrefixProvide(prefix: string, coverable: boolean = false): ValueProvider | FactoryProvider {
  if (coverable) {
    return {
      provide: ANTD_PREFIX,
      useFactory: PrefixFactory(prefix),
      deps: [[new Optional(), new SkipSelf(), new Inject(ANTD_PREFIX)]]
    };
  }
  return {
    provide: ANTD_PREFIX,
    useValue: prefix
  };
}
