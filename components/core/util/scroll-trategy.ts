/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';

export const NzScrollStrategyToken = new InjectionToken<ScrollStrategy>('NzScrollStrategyToken');

export function ScrollStrategyProviderFactory(overlay: Overlay): ScrollStrategy {
  return overlay.scrollStrategies.block();
}
