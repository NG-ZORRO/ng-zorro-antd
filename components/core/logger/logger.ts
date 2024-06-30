/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { isDevMode } from '@angular/core';

import { environment } from 'ng-zorro-antd/core/environments';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

const record: Record<string, boolean> = {};

export const PREFIX = '[NG-ZORRO]:';

function notRecorded(...args: NzSafeAny[]): boolean {
  const asRecord = args.reduce((acc, c) => acc + c.toString(), '');

  if (record[asRecord]) {
    return false;
  } else {
    record[asRecord] = true;
    return true;
  }
}

function consoleCommonBehavior(consoleFunc: (...args: NzSafeAny) => void, ...args: NzSafeAny[]): void {
  if (environment.isTestMode || (isDevMode() && notRecorded(...args))) {
    consoleFunc(...args);
  }
}

// Warning should only be printed in dev mode and only once.
export const warn = (...args: NzSafeAny[]): void =>
  consoleCommonBehavior((...arg: NzSafeAny[]) => console.warn(PREFIX, ...arg), ...args);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const warnDeprecation = (...args: NzSafeAny[]) => {
  if (!environment.isTestMode) {
    const stack = new Error().stack;
    return consoleCommonBehavior((...arg: NzSafeAny[]) => console.warn(PREFIX, 'deprecated:', ...arg, stack), ...args);
  } else {
    return () => {};
  }
};

// Log should only be printed in dev mode.
export const log = (...args: NzSafeAny[]): void => {
  if (isDevMode()) {
    console.log(PREFIX, ...args);
  }
};
