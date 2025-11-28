/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { isObservable, Observable, of } from 'rxjs';

import { isPromise } from './is-promise';

export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    // Not using `from()` because it includes support for many input types
    // (iterables, async generators, observables, etc.),
    // which increases bundle size. We're only handling Promises here, so a
    // minimal wrapper is used instead.
    return new Observable<T>(subscriber => {
      // Use `Promise.resolve()` to wrap promise-like instances.
      Promise.resolve(value)
        .then(result => {
          subscriber.next(result);
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    });
  }

  return of(value);
}
