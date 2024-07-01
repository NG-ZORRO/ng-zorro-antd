/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { isTouchEvent } from 'ng-zorro-antd/core/util';

export function getEventWithPoint(event: MouseEvent | TouchEvent): MouseEvent | Touch {
  return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : (event as MouseEvent);
}
