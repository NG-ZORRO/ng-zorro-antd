/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EMPTY, fromEvent, Observable } from 'rxjs';

// This would be exposed in the global environment whenever `zone.js` is
// included in the `polyfills` configuration property. Starting from Angular 17,
// users can opt-in to use zoneless change detection.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Zone: any;

function runOutsideAngular<T>(fn: () => T): T {
  // The function that does the same job as `NgZone.runOutsideAngular`.
  // The difference is that we don't need to rely on the `NgZone` service,
  // allowing `fromEventOutsideAngular` to function without requiring an explicit
  // injection context (where we might otherwise call `inject(NgZone)`).
  return typeof Zone !== 'undefined' ? Zone.root.run(fn) : fn();
}

/**
 * This function replaces `runOutsideAngular` with `fromEvent`, introducing a
 * lot of boilerplate where we need to inject the `NgZone` service and then subscribe
 * to `fromEvent` within the `runOutsideAngular` callback.
 */
export function fromEventOutsideAngular<TEvent extends Event>(
  target: EventTarget | null | undefined,
  name: string,
  options?: boolean | AddEventListenerOptions
): Observable<TEvent> {
  // Allow the event target to be nullable to avoid requiring callers to check
  // if the target exists. We simply complete the observable immediately,
  // as this might potentially be used within a `switchMap`.
  if (!target) {
    return EMPTY;
  }

  return new Observable<TEvent>(subscriber => {
    // Note that we're wrapping fromEvent with an observable because `fromEvent`
    // is eager and only calls `addEventListener` when a new subscriber comes in.
    // Therefore, we're wrapping the subscription with `runOutsideAngular` to ensure
    // that `addEventListener` is also called outside of Angular when there's a subscriber.
    return runOutsideAngular(() =>
      // Casting because the inferred overload is incorrect :(
      fromEvent<TEvent>(target, name, options as AddEventListenerOptions).subscribe(subscriber)
    );
  });
}
