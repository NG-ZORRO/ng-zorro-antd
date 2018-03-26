import { DatePipe } from '@angular/common';
import { Inject, Injectable, Optional, Provider, SkipSelf } from '@angular/core';

import { LoggerService } from '../core/util/logger/logger.service';

import { NzI18nInterface } from './nz-i18n.interface';
import { NZ_I18N } from './nz-i18n.token';

@Injectable()
export class NzI18nService {
  private _locale: NzI18nInterface;

  constructor(@Inject(NZ_I18N) locale: NzI18nInterface, private _logger: LoggerService, private datePipe: DatePipe) {
    this.setLocale(locale);
  }

  // [NOTE] Performance issue: this method may called by every change detections
  // TODO: cache more deeply paths for performance
  /* tslint:disable-next-line:no-any */
  translate(path: string, data?: any): string {
    // this._logger.debug(`[NzI18nService] Translating(${this._locale.locale}): ${path}`);
    let content = this._getObjectPath(this._locale, path) as string;
    if (typeof content === 'string') {
      if (data) {
        Object.keys(data).forEach((key) => content = content.replace(new RegExp(`%${key}%`, 'g'), data[ key ]));
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
  setLocale(locale: NzI18nInterface): void {
    this._locale = locale;
  }

  getLocale(): NzI18nInterface {
    return this._locale;
  }

  formatDate(date: Date, format: string): string {
    return this.datePipe.transform(date, format, null, this.getLocale().locale);
  }

  private _getObjectPath(obj: object, path: string): string | object {
    let res = obj;
    const paths = path.split('.');
    const depth = paths.length;
    let index = 0;
    while (res && index < depth) {
      res = res[ paths[ index++ ] ];
    }
    return index === depth ? res : null;
  }
}

export function NZ_LOCALE_SERVICE_PROVIDER_FACTORY(exist: NzI18nService, locale: NzI18nInterface, logger: LoggerService, datePipe: DatePipe): NzI18nService {
  return exist || new NzI18nService(locale, logger, datePipe);
}

export const NZ_I18N_SERVICE_PROVIDER: Provider = {
  provide   : NzI18nService,
  useFactory: NZ_LOCALE_SERVICE_PROVIDER_FACTORY,
  deps      : [ [ new Optional(), new SkipSelf(), NzI18nService ], NZ_I18N, LoggerService, DatePipe ]
};
