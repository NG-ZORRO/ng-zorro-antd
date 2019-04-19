import { Inject, Injectable, InjectionToken, Optional, Provider, SkipSelf } from '@angular/core';

export const NZ_LOGGER_STATE = new InjectionToken<boolean>('nz-logger-state'); // Whether print the log

@Injectable()
export class LoggerService {
  constructor(@Inject(NZ_LOGGER_STATE) private _loggerState: boolean) {}

  // tslint:disable-next-line:no-any
  log(...args: any[]): void {
    if (this._loggerState) {
      console.log(...args);
    }
  }

  // tslint:disable-next-line:no-any
  warn(...args: any[]): void {
    if (this._loggerState) {
      console.warn(...args);
    }
  }

  // tslint:disable-next-line:no-any
  error(...args: any[]): void {
    if (this._loggerState) {
      console.error(...args);
    }
  }

  // tslint:disable-next-line:no-any
  info(...args: any[]): void {
    if (this._loggerState) {
      console.log(...args);
    }
  }

  // tslint:disable-next-line:no-any
  debug(...args: any[]): void {
    if (this._loggerState) {
      console.log('[NG-ZORRO-DEBUG]', ...args);
    }
  }
}

export function LOGGER_SERVICE_PROVIDER_FACTORY(exist: LoggerService, loggerState: boolean): LoggerService {
  return exist || new LoggerService(loggerState);
}

export const LOGGER_SERVICE_PROVIDER: Provider = {
  provide: LoggerService,
  useFactory: LOGGER_SERVICE_PROVIDER_FACTORY,
  deps: [[new Optional(), new SkipSelf(), LoggerService], NZ_LOGGER_STATE]
};
