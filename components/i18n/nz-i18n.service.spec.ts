import { Component, OnDestroy } from '@angular/core';
import { inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subscription } from 'rxjs';
import en_US from './languages/en_US';
import zh_CN from './languages/zh_CN';
import { NzI18nInterface } from './nz-i18n.interface';
import { NzI18nModule } from './nz-i18n.module';
import { NzI18nService } from './nz-i18n.service';

describe('i18n service', () => {
  let srv: NzI18nService;
  let fixture: ComponentFixture<NzI18nTestComponent>;
  let testComponent: NzI18nTestComponent;
  const DEFAULT_LAN = zh_CN;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NzI18nTestComponent],
      imports: [NzI18nModule]
    }).compileComponents();
  });

  describe('#setLocale', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzI18nTestComponent);
      testComponent = fixture.debugElement.componentInstance;
    });

    beforeEach(inject([NzI18nService], (s: NzI18nService) => {
      srv = s;
    }));

    it('should be auto default zh_CN', () => {
      expect(testComponent.locale.locale).toBe(DEFAULT_LAN.locale);
    });

    it('should trigger changed when set different lang', () => {
      const spy = spyOn(testComponent, 'updateLocale');
      expect(spy).not.toHaveBeenCalled();
      srv.setLocale(en_US);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not trigger change when set same lang', () => {
      const spy = spyOn(testComponent, 'updateLocale');
      expect(spy).not.toHaveBeenCalled();
      srv.setLocale(zh_CN);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should warn when locale for a component is not provided', () => {
      const spy = spyOn(console, 'warn');
      srv.setLocale({ locale: 'not_existing_language' } as any); // tslint:disable-line no-any
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
});

@Component({
  template: ''
})
export class NzI18nTestComponent implements OnDestroy {
  locale: NzI18nInterface;

  private localeSubscription: Subscription;

  constructor(private nzI18nService: NzI18nService) {
    this.localeSubscription = this.nzI18nService.localeChange.subscribe(locale => {
      this.updateLocale(locale);
    });
  }

  ngOnDestroy(): void {
    this.localeSubscription.unsubscribe();
  }

  updateLocale(locale: NzI18nInterface): void {
    this.locale = locale;
  }
}
