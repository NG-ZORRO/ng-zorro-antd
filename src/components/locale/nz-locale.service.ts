import { Injectable, Inject, Provider, Optional, SkipSelf } from '@angular/core';
import { LoggerService } from '../util/logger/index';
import { NZ_LOCALE } from './nz-locale.token';
import { NzLocale } from './nz-locale.class';
import * as moment from 'moment';

@Injectable()
export class NzLocaleService {
  private _locale: NzLocale;

  constructor(@Inject(NZ_LOCALE) locale: NzLocale, private _logger: LoggerService) {
    this.setLocale(locale);
  }

  // [NOTE] Performance issue: this method may called by every change detections
  // TODO: cache more deeply paths for performance
  translate(path: string, data?: any) {
    this._logger.debug(`[NzLocaleService] Translating(${this._locale.locale}): ${path}`);
    let content = this._getObjectPath(this._locale, path);
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
  setLocale(locale: NzLocale) {
    moment.locale(locale.locale);
    this._locale = locale;
  }

  getLocale() {
    return this._locale;
  }

  private _getObjectPath(obj: Object, path: string): any {
    const paths = path.split('.'), depth = paths.length;
    let index = 0;
    while (obj && index < depth) {
      obj = obj[paths[index++]];
    }
    return index === depth ? obj : null;
  }
}

export function NZ_LOCALE_SERVICE_PROVIDER_FACTORY(exist, locale, logger) {
  return exist || new NzLocaleService(locale, logger);
}

export const NZ_LOCALE_SERVICE_PROVIDER: Provider = {
  provide: NzLocaleService,
  useFactory: NZ_LOCALE_SERVICE_PROVIDER_FACTORY,
  deps: [ [ new Optional, new SkipSelf, NzLocaleService ], NZ_LOCALE, LoggerService ],
};
