/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EventEmitter, Injectable, NgZone } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 *
 * @docs-private
 */
@Injectable()
export class MockNgZone extends NgZone {
  override onStable = new EventEmitter<NzSafeAny>(false);

  constructor() {
    super({ enableLongStackTrace: false });
  }

  override run(fn: () => NzSafeAny): NzSafeAny {
    return fn();
  }

  override runOutsideAngular(fn: () => NzSafeAny): NzSafeAny {
    return fn();
  }

  simulateZoneExit(): void {
    this.onStable.emit(null);
  }
}
