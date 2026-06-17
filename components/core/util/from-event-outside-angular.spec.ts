/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { fromEvent } from 'rxjs';

import { fromEventOutsideAngular } from './from-event-outside-angular';

declare const Zone: ZoneLike;

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
    const angularZone = Zone.current.fork({ name: 'angular' });

    const subscriptions = angularZone.run(() => [
      fromEvent(document, 'click').subscribe(() => {
        recorder.push(['fromEvent zone: ', Zone.current.name]);
      }),
      fromEventOutsideAngular(document, 'click').subscribe(() => {
        recorder.push(['fromEventOutsideAngular zone: ', Zone.current.name]);
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
