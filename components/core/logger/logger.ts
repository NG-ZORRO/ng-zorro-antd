/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// tslint:disable:no-any

import { isDevMode } from '@angular/core';

export namespace NzLoggerFuncs {
  const record: Record<string, boolean> = {};

  type ConsoleFunc = (...args: any) => void;

  export function getNzConsolePrefix(): string {
    return '[NG-ZORRO]:';
  }

  function notRecorded(...args: any[]): boolean {
    const asRecord = args.reduce((acc, c) => acc + c.toString(), '');
    if (record[asRecord]) {
      return false;
    } else {
      record[asRecord] = true;
      return true;
    }
  }

  function consoleCommonBehavior(consoleFunc: ConsoleFunc, ...args: any[]): void {
    if (!isDevMode() || !notRecorded(...args)) {
      return;
    }

    consoleFunc(...args);
  }

  // Warning should only be printed in dev mode and only once.
  export const warn = (...args: any[]) =>
    consoleCommonBehavior((...arg: any[]) => console.warn(getNzConsolePrefix(), ...arg), ...args);

  export const warnDeprecation = (...args: any[]) =>
    consoleCommonBehavior((...arg: any[]) => console.error(getNzConsolePrefix(), 'deprecated:', ...arg), ...args);

  // Log should only be printed in dev mode.
  export const log = (...args: any[]) => {
    if (isDevMode()) {
      console.log(getNzConsolePrefix(), ...args);
    }
  };
}
