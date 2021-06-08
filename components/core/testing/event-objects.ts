/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

/** Creates a browser MouseEvent with the specified options. */
export function createMouseEvent(type: string, x: number = 0, y: number = 0, button: number = 0): MouseEvent {
  const event = document.createEvent('MouseEvent');

  event.initMouseEvent(
    type,
    true /* canBubble */,
    false /* cancelable */,
    window /* view */,
    0 /* detail */,
    x /* screenX */,
    y /* screenY */,
    x /* clientX */,
    y /* clientY */,
    false /* ctrlKey */,
    false /* altKey */,
    false /* shiftKey */,
    false /* metaKey */,
    button /* button */,
    null /* relatedTarget */
  );

  // `initMouseEvent` doesn't allow us to pass the `buttons` and
  // defaults it to 0 which looks like a fake event.
  Object.defineProperty(event, 'buttons', { get: () => 1 });

  return event;
}

/** Creates a browser TouchEvent with the specified pointer coordinates. */
export function createTouchEvent(type: string, pageX: number = 0, pageY: number = 0): UIEvent {
  // In favor of creating events that work for most of the browsers, the event is created
  // as a basic UI Event. The necessary details for the event will be set manually.
  const event = new UIEvent(type, { detail: 0, view: window });
  const touchDetails = { pageX, pageY, clientX: pageX, clientY: pageY };

  // Most of the browsers don't have a "initTouchEvent" method that can be used to define
  // the touch details.
  Object.defineProperties(event, {
    touches: { value: [touchDetails] },
    targetTouches: { value: [touchDetails] },
    changedTouches: { value: [touchDetails] }
  });

  return event;
}

/** Dispatches a keydown event from an element. */
export function createKeyboardEvent(
  type: string,
  keyCode: number,
  target?: Element,
  key?: string,
  ctrlKey?: boolean,
  metaKey?: boolean,
  shiftKey?: boolean
): KeyboardEvent {
  const event = document.createEvent('KeyboardEvent') as NzSafeAny;
  const originalPreventDefault = event.preventDefault;

  // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
  if (event.initKeyEvent) {
    event.initKeyEvent(type, true, true, window, 0, 0, 0, 0, 0, keyCode);
  } else {
    event.initKeyboardEvent(type, true, true, window, 0, key, 0, '', false);
  }

  // Webkit Browsers don't set the keyCode when calling the init function.
  // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
  Object.defineProperties(event, {
    keyCode: { get: () => keyCode },
    key: { get: () => key },
    target: { get: () => target },
    ctrlKey: { get: () => ctrlKey },
    metaKey: { get: () => metaKey },
    shiftKey: { get: () => shiftKey }
  });

  // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
  event.preventDefault = function () {
    Object.defineProperty(event, 'defaultPrevented', { get: () => true, configurable: true });
    // eslint-disable-next-line prefer-rest-params
    return originalPreventDefault.apply(this, arguments);
  };

  return event;
}

/** Creates a fake event object with any desired event type. */
export function createFakeEvent(type: string, canBubble: boolean = true, cancelable: boolean = true): Event {
  const event = document.createEvent('Event');
  event.initEvent(type, canBubble, cancelable);
  return event;
}
