import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IndexableObject } from '../core/types/indexable';

import zh_CN from './languages/zh_CN';
import { DateLocale, NzI18nInterface } from './nz-i18n.interface';
import { NZ_DATE_LOCALE, NZ_I18N } from './nz-i18n.token';

@Injectable({
  providedIn: 'root'
})
export class NzI18nService {
  private _locale: NzI18nInterface;
  private _change = new BehaviorSubject<NzI18nInterface>(this._locale);
  private dateLocale: DateLocale;

  get localeChange(): Observable<NzI18nInterface> {
    return this._change.asObservable();
  }

  constructor(
    @Inject(NZ_I18N) locale: NzI18nInterface,
    @Inject(NZ_DATE_LOCALE) dateLocale: DateLocale) {

    this.setLocale(locale || zh_CN);
    this.setDateLocale(dateLocale || null);
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
    if (this._locale && this._locale.locale === locale.locale) {
      return;
    }
    this._locale = locale;
    this._change.next(locale);
  }

  getLocale(): NzI18nInterface {
    return this._locale;
  }

  getLocaleId(): string {
    return this._locale ? this._locale.locale : '';
  }

  setDateLocale(dateLocale: DateLocale): void {
    this.dateLocale = dateLocale;
  }

  getDateLocale(): DateLocale {
    return this.dateLocale;
  }

  /**
   * Get locale data
   * @param path dot paths for finding exist value from locale data, eg. "a.b.c"
   * @param defaultValue default value if the result is not "truthy"
   */
  getLocaleData(path?: string, defaultValue?: any): any { // tslint:disable-line:no-any
    const result = path ? this._getObjectPath(this._locale, path) : this._locale;
    return result || defaultValue;
  }

  private _getObjectPath(obj: IndexableObject, path: string): string | object | any { // tslint:disable-line:no-any
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
