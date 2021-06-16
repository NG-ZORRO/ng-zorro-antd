/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { of } from 'rxjs';
import { delay, finalize, takeUntil } from 'rxjs/operators';

import { NzDestroyService } from './destroy';

describe('NzDestroy service', () => {
  let destroyService: NzDestroyService;
  const initObservable = of('done');

  beforeEach(() => {
    destroyService = new NzDestroyService();
  });

  it('should subscribe work normal', () => {
    let result = 'initial';

    initObservable.pipe(takeUntil(destroyService)).subscribe(value => {
      result = value;
    });

    expect(result).toBe('done');
  });

  it('should complete work normal', () => {
    let result = 'initial';

    initObservable
      .pipe(
        delay(1000),
        takeUntil(destroyService),
        finalize(() => {
          result = 'done';
        })
      )
      .subscribe();

    destroyService.ngOnDestroy();

    expect(result).toBe('done');
  });
});
