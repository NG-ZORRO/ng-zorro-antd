/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayRef } from '@angular/cdk/overlay';

export function overlayZIndexSetter(overlayRef: OverlayRef, zIndex?: number): void {
  if (!zIndex) return;

  (overlayRef['_host'] as HTMLElement).style.zIndex = `${zIndex}`;
}
