/* tslint:disable:no-any */
import { Inject, Injectable, InjectionToken, Optional, Provider, SkipSelf } from '@angular/core';

@Injectable()
export class LoggerService {
  constructor(@Inject(NZ_LOGGER_STATE) private _loggerState: boolean) {}

  log(...args: any[]): void {
    if (this._loggerState) {
      // console.log(...args);
      console.log.apply(console, arguments);
    }
  }

  warn(...args: any[]): void {
    if (this._loggerState) {
      // console.warn(...args);
      console.warn.apply(console, arguments);
    }
  }

  error(...args: any[]): void {
    if (this._loggerState) {
      // console.error(...args);
      console.error.apply(console, arguments);
    }
  }

  info(...args: any[]): void {
    if (this._loggerState) {
      // console.log(...args);
      console.log.apply(console, arguments);
    }
  }

  debug(...args: any[]): void {
    if (this._loggerState) {
      // console.log('[NG-ZORRO-DEBUG]', ...args);
      const arrs = Array.prototype.slice.call(arguments);
      console.log.apply(console, ['[NG-ZORRO-DEBUG]'].concat(arrs));
    }
  }
}

export const NZ_LOGGER_STATE = new InjectionToken<boolean>('nz-logger-state'); // Whether print the log

export function LOGGER_SERVICE_PROVIDER_FACTORY(exist: LoggerService, loggerState: boolean): LoggerService { return exist || new LoggerService(loggerState); }

export const LOGGER_SERVICE_PROVIDER: Provider = {
  provide: LoggerService,
  useFactory: LOGGER_SERVICE_PROVIDER_FACTORY,
  deps: [ [ new Optional(), new SkipSelf(), LoggerService ], NZ_LOGGER_STATE ]
};
