import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import en_US from './languages/en_US';
import zh_CN from './languages/zh_CN';
import zh_TW from './languages/zh_TW';
import { NzI18nModule } from './nz-i18n.module';
import { NzI18nService } from './nz-i18n.service';

import zhHantHK from '@angular/common/locales/zh-Hant-HK';

describe('nz-i18n.service', () => {
  let injector: Injector;
  let srv: NzI18nService;
  const DEFAULT_LAN = zh_CN;

  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [NzI18nModule]
    });

    srv = injector.get(NzI18nService);
  });

  describe('#setLocale', () => {
    // tslint:disable:no-string-literal
    it('should be auto default zh_CN', () => {
      expect(srv.getLocale().locale).toBe(DEFAULT_LAN.locale);
      expect(srv.getLocaleId()).toBe(DEFAULT_LAN.locale);
      expect(srv.getNgLocaleId()).toBe(DEFAULT_LAN.locale);
    });
    it('should set ngLocaleId to zh-hant-hk locale', () => {
      spyOn(srv['_change'], 'next');
      expect(srv['_change'].next).not.toHaveBeenCalled();
      srv.setLocale(zh_TW, zhHantHK[0] + '');
      expect(srv.getNgLocaleId()).toBe(zhHantHK[0] + '');
      expect(srv.getLocaleId()).toBe(zh_TW.locale);
    });
    it('should trigger changed when set different lang', () => {
      spyOn(srv['_change'], 'next');
      expect(srv['_change'].next).not.toHaveBeenCalled();
      srv.setLocale(en_US);
      expect(srv['_change'].next).toHaveBeenCalled();
    });
    it('should not trigger change when set same lang', () => {
      spyOn(srv['_change'], 'next');
      expect(srv['_change'].next).not.toHaveBeenCalled();
      srv.setLocale(zh_CN);
      expect(srv['_change'].next).not.toHaveBeenCalled();
    });
  });
});
