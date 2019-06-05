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
  const isDev = isDevMode();
  const record: Record<string, boolean> = {};

  type ConsoleFunc = (...args: any) => void;

  function getNzConsolePrefix(): string {
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

  function revealStack(...args: any[]): void {
    try {
      throw new Error(...args);
    } catch (x) {}
  }

  function consoleCommonBehavior(consoleFunc: ConsoleFunc, ...args: any[]): void {
    if (!isDev || !notRecorded(...args)) {
      return;
    }

    consoleFunc(...args);
    revealStack(...args);
  }

  export const warn = (...args: any[]) =>
    consoleCommonBehavior((...arg: any[]) => console.warn(getNzConsolePrefix(), ...arg), ...args);
  export const error = (...args: any[]) =>
    consoleCommonBehavior((...arg: any[]) => console.error(getNzConsolePrefix(), ...arg), ...args);
  export const warnDeprecation = (...args: any[]) =>
    consoleCommonBehavior((...arg: any[]) => console.error(getNzConsolePrefix(), 'deprecated:', ...arg), ...args);
  export const log = (...args: any[]) =>
    consoleCommonBehavior((...arg: any[]) => console.log(getNzConsolePrefix(), 'deprecated:', ...arg), ...args);

  // export const log = isDev
  //   ? (...args: any[]) => {
  //     console.log(getNzConsolePrefix(), ...args);
  //   }
  //   : noop;
  //
  // export const info = isDev
  //   ? (...args: any[]) => {
  //     console.info(getNzConsolePrefix(), ...args);
  //   }
  //   : noop;
  //
  // export const debug = isDev
  //   ? (...args: any[]) => {
  //     console.debug(getNzConsolePrefix(), ...args);
  //   }
  //   : noop;
}
