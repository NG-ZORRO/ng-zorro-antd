/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { vi } from 'vitest';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NZ_I18N, provideNzI18n } from 'ng-zorro-antd/i18n/nz-i18n.token';

import en_US from './languages/en_US';
import zh_CN from './languages/zh_CN';
import { NzI18nInterface } from './nz-i18n.interface';
import { NzI18nService } from './nz-i18n.service';

describe('i18n service', () => {
  let srv: NzI18nService;
  let fixture: ComponentFixture<NzI18nTestComponent>;
  let testComponent: NzI18nTestComponent;
  const DEFAULT_LANG = zh_CN;

  describe('#setLocale', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNzI18n(DEFAULT_LANG)]
      });

      fixture = TestBed.createComponent(NzI18nTestComponent);
      testComponent = fixture.debugElement.componentInstance;
      srv = TestBed.inject(NzI18nService);
    });

    it('should be provide interface be right', () => {
      fixture = TestBed.createComponent(NzI18nTestComponent);
      expect(fixture.componentInstance.locale === DEFAULT_LANG).toBe(true);
    });

    it('should be auto default zh_CN', () => {
      expect(testComponent.locale.locale).toBe(DEFAULT_LANG.locale);
    });

    it('should trigger changed when set different lang', () => {
      const spy = vi.spyOn(testComponent, 'updateLocale');
      expect(spy).not.toHaveBeenCalled();
      srv.setLocale(en_US);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not trigger change when set same lang', () => {
      const spy = vi.spyOn(testComponent, 'updateLocale');
      expect(spy).not.toHaveBeenCalled();
      srv.setLocale(zh_CN);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should warn when locale for a component is not provided', () => {
      const spy = vi.spyOn(console, 'warn');
      srv.setLocale({ locale: 'not_existing_language' } as NzSafeAny);
      expect(srv.getLocaleData('global.placeholder')).toBeTruthy();
      expect(spy).toHaveBeenCalledWith(
        '[NG-ZORRO]:',
        `Missing translations for "global.placeholder" in language "not_existing_language".
You can use "NzI18nService.setLocale" as a temporary fix.
Welcome to submit a pull request to help us optimize the translations!
https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md`
      );
    });
  });

  describe('provideNzI18n', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNzI18n(() => en_US)]
      });

      fixture = TestBed.createComponent(NzI18nTestComponent);
      testComponent = fixture.debugElement.componentInstance;
      srv = TestBed.inject(NzI18nService);
    });

    it('should factory work', () => {
      expect(testComponent.locale.locale).toBe(en_US.locale);
    });
  });
});

@Component({
  template: ''
})
export class NzI18nTestComponent {
  private readonly initialLocale = inject(NZ_I18N);
  private readonly nzI18nService = inject(NzI18nService);

  locale = this.initialLocale;

  constructor() {
    this.nzI18nService.localeChange.pipe(takeUntilDestroyed()).subscribe(locale => {
      this.updateLocale(locale);
    });
  }

  updateLocale(locale: NzI18nInterface): void {
    this.locale = locale;
  }
}
