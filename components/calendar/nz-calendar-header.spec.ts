import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzRadioGroupComponent as RadioGroup, NzRadioModule } from '../radio/index';
import { NzSelectComponent as Select } from '../select/nz-select.component';
import { NzSelectModule } from '../select/nz-select.module';
import { NzCalendarHeaderComponent, NzCalendarHeaderComponent as CalendarHeader } from './nz-calendar-header.component';

registerLocaleData(zh);

describe('Calendar Header', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NzI18nModule,
        NzRadioModule,
        NzSelectModule,
        NoopAnimationsModule
      ],
      declarations: [
        CalendarHeader,
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

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarHeaderModeComponent);
      component = fixture.componentInstance;
    }));

    it('should be month by default', () => {
      fixture.detectChanges();

      const modeNgModel = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0]
        .query(By.directive(RadioGroup)).injector.get(NgModel);
      expect(modeNgModel.model).toBe('month');
    });

    it('should update mode passed in', () => {
      component.mode = 'year';

      fixture.detectChanges();

      const modeNgModel = fixture.debugElement.queryAll(By.directive(CalendarHeader))[1]
        .query(By.directive(RadioGroup)).injector.get(NgModel);
      expect(modeNgModel.model).toBe('year');
    });

    it('should emit change event for mode selection', () => {
      const modeNgModel = fixture.debugElement.queryAll(By.directive(CalendarHeader))[1]
        .query(By.directive(RadioGroup)).injector.get(NgModel);
      modeNgModel.viewToModelUpdate('year');

      fixture.detectChanges();

      expect(component.mode).toBe('year');
    });
  });

  describe('fullscreen', () => {
    let fixture: ComponentFixture<NzTestCalendarHeaderFullscreenComponent>;
    let component: NzTestCalendarHeaderFullscreenComponent;

    beforeEach(async(() => {
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
    let component: NzTestCalendarHeaderActiveDateComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarHeaderActiveDateComponent);
      component = fixture.componentInstance;
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
    });
  });

  describe('changes', () => {
    let fixture: ComponentFixture<NzTestCalendarHeaderChangesComponent>;
    let component: NzTestCalendarHeaderChangesComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarHeaderChangesComponent);
      component = fixture.componentInstance;
    }));

    it('should emit yearChange when year changed', () => {
      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const [yearModel] = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel));

      yearModel.viewToModelUpdate(2010);

      fixture.detectChanges();

      expect(component.year).toBe(2010);
    });

    it('should emit monthChange when month changed', () => {
      fixture.detectChanges();
      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const [_, monthModel] = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel));

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
});

@Component({
  template: `
    <nz-calendar-header></nz-calendar-header>
    <nz-calendar-header [(mode)]="mode"></nz-calendar-header>
  `
})
class NzTestCalendarHeaderModeComponent {
  mode: 'month'|'year' = 'month';
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
  activeDate = new Date(2001, 1, 3);
}

@Component({
  template: `
    <nz-calendar-header
      (yearChange)="year = $event"
      (monthChange)="month = $event">
    </nz-calendar-header>
  `
})
class NzTestCalendarHeaderChangesComponent {
  year: number|null = null;
  month: number|null = null;
}
