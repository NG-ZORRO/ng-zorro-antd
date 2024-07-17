import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CandyDate } from 'ng-zorro-antd/core/time';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzRadioGroupComponent as RadioGroup, NzRadioModule } from '../radio/index';
import { NzSelectComponent as Select } from '../select/select.component';
import { NzCalendarHeaderComponent, NzCalendarHeaderComponent as CalendarHeader } from './calendar-header.component';

registerLocaleData(zh);

describe('Calendar Header', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NzI18nModule, NzRadioModule, NzSelectModule, NoopAnimationsModule, CalendarHeader],
      declarations: [
        NzTestCalendarHeaderModeComponent,
        NzTestCalendarHeaderFullscreenComponent,
        NzTestCalendarHeaderActiveDateComponent,
        NzTestCalendarHeaderChangesComponent
      ]
    }).compileComponents();
  }));

  describe('mode', () => {
    let fixture: ComponentFixture<NzTestCalendarHeaderModeComponent>;
    let component: NzTestCalendarHeaderModeComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(NzTestCalendarHeaderModeComponent);
      component = fixture.componentInstance;
    }));

    it('should be month by default', () => {
      fixture.detectChanges();

      const modeNgModel = fixture.debugElement
        .queryAll(By.directive(CalendarHeader))[0]
        .query(By.directive(RadioGroup))
        .injector.get(NgModel);
      expect(modeNgModel.model).toBe('month');
    });

    it('should update mode passed in', () => {
      component.mode = 'year';

      fixture.detectChanges();

      const modeNgModel = fixture.debugElement
        .queryAll(By.directive(CalendarHeader))[1]
        .query(By.directive(RadioGroup))
        .injector.get(NgModel);
      expect(modeNgModel.model).toBe('year');
    });

    it('should emit change event for mode selection', () => {
      fixture.detectChanges();

      const modeNgModel = fixture.debugElement
        .queryAll(By.directive(CalendarHeader))[1]
        .query(By.directive(RadioGroup))
        .injector.get(NgModel);
      modeNgModel.viewToModelUpdate('year');

      fixture.detectChanges();

      expect(component.mode).toBe('year');
    });
  });

  describe('fullscreen', () => {
    let fixture: ComponentFixture<NzTestCalendarHeaderFullscreenComponent>;
    let component: NzTestCalendarHeaderFullscreenComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(NzTestCalendarHeaderFullscreenComponent);
      component = fixture.componentInstance;
    }));

    it('should be true by default', () => {
      fixture.detectChanges();

      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const [yearSelect, monthSelect] = header.queryAll(By.directive(Select)).map(x => x.injector.get(Select));
      const modeRadioGroup = header.query(By.directive(RadioGroup)).injector.get(RadioGroup);

      expect(yearSelect.nzSize).not.toBe('small');
      expect(monthSelect.nzSize).not.toBe('small');
      expect(modeRadioGroup.nzSize).not.toBe('small');
    });

    it('should use small size when not in fullscreen', () => {
      component.fullscreen = false;

      fixture.detectChanges();

      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[1];
      const [yearSelect, monthSelect] = header.queryAll(By.directive(Select)).map(x => x.injector.get(Select));
      const modeRadioGroup = header.query(By.directive(RadioGroup)).injector.get(RadioGroup);

      expect(yearSelect.nzSize).toBe('small');
      expect(monthSelect.nzSize).toBe('small');
      expect(modeRadioGroup.nzSize).toBe('small');
    });
  });

  describe('activeDate', () => {
    let fixture: ComponentFixture<NzTestCalendarHeaderActiveDateComponent>;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(NzTestCalendarHeaderActiveDateComponent);
    }));

    it('should be now by default', () => {
      const now = new Date();

      fixture.detectChanges();

      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const [yearModel, monthModel] = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel));

      expect(yearModel.model).toBe(now.getFullYear());
      expect(monthModel.model).toBe(now.getMonth());
    });

    it('should update model binding to passed date', () => {
      fixture.detectChanges();

      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[1];
      const [yearModel, monthModel] = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel));

      expect(yearModel.model).toBe(2001);
      expect(monthModel.model).toBe(1);
      const headerComponent = header.injector.get(NzCalendarHeaderComponent);
      expect(headerComponent.years[0].value).toBe(1991);
    });
  });

  describe('changes', () => {
    let fixture: ComponentFixture<NzTestCalendarHeaderChangesComponent>;
    let component: NzTestCalendarHeaderChangesComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(NzTestCalendarHeaderChangesComponent);
      component = fixture.componentInstance;
    }));

    it('should emit yearChange when year changed', fakeAsync(() => {
      tick(1);
      fixture.detectChanges();

      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const [yearModel] = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel));

      yearModel.viewToModelUpdate(2010);

      fixture.detectChanges();

      expect(component.year).toBe(2010);
    }));

    it('should emit monthChange when month changed', () => {
      fixture.detectChanges();
      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const monthModel = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel))[1];

      monthModel.viewToModelUpdate(2);

      fixture.detectChanges();

      expect(component.month).toBe(2);
    });

    it('should update years when change year', () => {
      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const headerComponent = header.injector.get(NzCalendarHeaderComponent);
      headerComponent.updateYear(2010);
      expect(headerComponent.years[0].value).toBe(2000);
    });
  });

  describe('custom Header', () => {
    let fixture: ComponentFixture<NzTestCalendarHeaderChangesComponent>;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(NzTestCalendarHeaderChangesComponent);
    }));

    it('should have the default header if custom header is not passed', fakeAsync(() => {
      fixture.componentInstance.customHeader = undefined;
      tick(1);
      fixture.detectChanges();

      const defaultHeader = fixture.debugElement.query(By.css('.ant-picker-calendar-header'));
      expect(defaultHeader).toBeTruthy();

      fixture.componentInstance.customHeader = fixture.componentInstance.customHeaderElement;
      tick(1);
      fixture.detectChanges();

      const defaultHeader2 = fixture.debugElement.query(By.css('.ant-picker-calendar-header'));
      expect(defaultHeader2).toBeFalsy();
    }));
  });
});

@Component({
  template: `
    <nz-calendar-header></nz-calendar-header>
    <nz-calendar-header [(mode)]="mode"></nz-calendar-header>
  `
})
class NzTestCalendarHeaderModeComponent {
  mode: 'month' | 'year' = 'month';
}

@Component({
  template: `
    <nz-calendar-header></nz-calendar-header>
    <nz-calendar-header [fullscreen]="fullscreen"></nz-calendar-header>
  `
})
class NzTestCalendarHeaderFullscreenComponent {
  fullscreen = true;
}

@Component({
  template: `
    <nz-calendar-header></nz-calendar-header>
    <nz-calendar-header [activeDate]="activeDate"></nz-calendar-header>
  `
})
class NzTestCalendarHeaderActiveDateComponent {
  activeDate = new CandyDate(new Date(2001, 1, 3));
}

@Component({
  template: `
    <nz-calendar-header
      [nzCustomHeader]="customHeader"
      (yearChange)="year = $event"
      (monthChange)="month = $event"
    ></nz-calendar-header>

    <ng-template #customHeaderElement>
      <p>custom header</p>
    </ng-template>
  `
})
class NzTestCalendarHeaderChangesComponent {
  @ViewChild('customHeaderElement', { static: true }) customHeaderElement!: TemplateRef<NzSafeAny>;

  year: number | null = null;
  month: number | null = null;
  customHeader?: TemplateRef<void>;
}
