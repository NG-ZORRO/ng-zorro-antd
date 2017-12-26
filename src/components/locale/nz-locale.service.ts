/* tslint:disable:no-any */
import { Inject, Injectable, Optional, Provider, SkipSelf } from '@angular/core';
import * as moment from 'moment';
import { LoggerService } from '../util/logger/index';
import { NzLocale } from './nz-locale.class';
import { NZ_LOCALE } from './nz-locale.token';

@Injectable()
export class NzLocaleService {
  private _locale: NzLocale;

  constructor(@Inject(NZ_LOCALE) locale: NzLocale, private _logger: LoggerService) {
    this.setLocale(locale);
  }

  // [NOTE] Performance issue: this method may called by every change detections
  // TODO: cache more deeply paths for performance
  translate(path: string, data?: any): string {
    this._logger.debug(`[NzLocaleService] Translating(${this._locale.locale}): ${path}`);
    let content = this._getObjectPath(this._locale, path) as string;
    if (typeof content === 'string') {
      if (data) {
        Object.keys(data).forEach((key) => content = content.replace(new RegExp(`%${key}%`, 'g'), data[key]));
      }
      return content;
    }
    return path;
  }

  /**
   * Set/Change current locale globally throughout the WHOLE application
   * [NOTE] If called at runtime, rendered interface may not change along with the locale change (because this do not trigger another render schedule)
   * @param locale The translating letters
   */
  setLocale(locale: NzLocale): void {
    moment.locale(locale.locale);
    this._locale = locale;
  }

  getLocale(): NzLocale {
    return this._locale;
  }

  private _getObjectPath(obj: object, path: string): string | object {
    let res = obj;
    const paths = path.split('.');
    const depth = paths.length;
    let index = 0;
    while (res && index < depth) {
      res = res[paths[index++]];
    }
    return index === depth ? res : null;
  }
}

export function NZ_LOCALE_SERVICE_PROVIDER_FACTORY(exist: NzLocaleService, locale: NzLocale, logger: LoggerService): NzLocaleService {
  return exist || new NzLocaleService(locale, logger);
}

export const NZ_LOCALE_SERVICE_PROVIDER: Provider = {
  provide: NzLocaleService,
  useFactory: NZ_LOCALE_SERVICE_PROVIDER_FACTORY,
  deps: [ [ new Optional(), new SkipSelf(), NzLocaleService ], NZ_LOCALE, LoggerService ],
};
