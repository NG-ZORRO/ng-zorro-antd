/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { fromEvent } from 'rxjs';

import { fromEventOutsideAngular } from './from-event-outside-angular';

interface ZoneLike {
  current: ZoneInstance;
  root: ZoneInstance;
}

interface ZoneInstance {
  name: string;
  fork(zoneSpec: { name: string }): ZoneInstance;
  run<T>(fn: () => T): T;
}

describe('fromEventOutsideAngular', () => {
  it('should add event listener outside of the Angular zone', () => {
    const recorder: Array<[string, string]> = [];
    const zone = (globalThis as typeof globalThis & { Zone?: ZoneLike }).Zone;

    if (!zone) {
      // In zoneless mode the helper should degrade to a normal fromEvent
      // subscription because there is no Angular zone to escape from.
      const subscription = fromEventOutsideAngular(document, 'click').subscribe(() => {
        recorder.push(['fromEventOutsideAngular zone: ', 'zoneless']);
      });

      document.body.click();

      expect(recorder).toEqual([['fromEventOutsideAngular zone: ', 'zoneless']]);
      subscription.unsubscribe();
      return;
    }

    // With zone.js present, the native fromEvent callback keeps the angular
    // zone, while fromEventOutsideAngular must subscribe from the root zone.
    const angularZone = zone.current.fork({ name: 'angular' });

    const subscriptions = angularZone.run(() => [
      fromEvent(document, 'click').subscribe(() => {
        recorder.push(['fromEvent zone: ', zone.current.name]);
      }),
      fromEventOutsideAngular(document, 'click').subscribe(() => {
        recorder.push(['fromEventOutsideAngular zone: ', zone.current.name]);
      })
    ]);

    document.body.click();

    expect(recorder).toEqual([
      ['fromEvent zone: ', 'angular'],
      ['fromEventOutsideAngular zone: ', '<root>']
    ]);
    subscriptions.forEach(subscription => subscription.unsubscribe());
  });
});
