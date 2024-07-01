/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { dispatchFakeEvent } from './dispatch-events';

/**
 * Focuses an input, sets its value and dispatches
 * the `input` event, simulating the user typing.
 *
 * @param value Value to be set on the input.
 * @param element Element onto which to set the value.
 */
export function typeInElement(value: string, element: HTMLInputElement | HTMLTextAreaElement): void {
  element.focus();
  element.value = value;
  dispatchFakeEvent(element, 'input');
}
