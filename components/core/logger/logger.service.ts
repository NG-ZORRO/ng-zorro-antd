/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// tslint:disable:no-any

import { isDevMode, Injectable } from '@angular/core';

const isDev = isDevMode();

/**
 * A module can be injected into other components to produce log only in dev mode.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(...args: any[]): void {
    if (isDev) {
      console.log(this.getPrefix(), ...args);
    }
  }

  warn(...args: any[]): void {
    if (isDev) {
      console.warn(this.getPrefix(), ...args);
    }
  }

  error(...args: any[]): void {
    if (isDev) {
      console.error(this.getPrefix(), ...args);
    }
  }

  info(...args: any[]): void {
    if (isDev) {
      console.log(this.getPrefix(), ...args);
    }
  }

  debug(...args: any[]): void {
    if (isDev) {
      console.log(this.getPrefix(), ...args);
    }
  }

  /**
   * Use this method to get a prefix. Only use when you want to throw an error with correct prefix.
   */
  getPrefix(): string {
    return '[NG-ZORRO]';
  }
}
