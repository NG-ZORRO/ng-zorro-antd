/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import type { ComponentFixture } from '@angular/core/testing';

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function updateNonSignalsInput<T>(fixture: ComponentFixture<T>, ms?: number): Promise<void> {
  fixture.changeDetectorRef.markForCheck();
  if (typeof ms === 'number') {
    await sleep(ms);
  }
  await fixture.whenStable();
}
