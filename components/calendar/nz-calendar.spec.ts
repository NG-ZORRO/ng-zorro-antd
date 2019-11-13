import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component } from '@angular/core';
import { async, fakeAsync, flush, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CandyDate } from 'ng-zorro-antd/core';
import { NZ_DATE_CONFIG } from '../i18n/date-config';
import { NzCalendarHeaderComponent as CalendarHeader } from './nz-calendar-header.component';
import { NzCalendarComponent as Calendar } from './nz-calendar.component';
import { NzCalendarModule } from './nz-calendar.module';

registerLocaleData(zh);

describe('Calendar', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NzCalendarModule, NoopAnimationsModule],
      declarations: [
        NzTestCalendarModeComponent,
        NzTestCalendarValueComponent,
        NzTestCalendarFullscreenComponent,
        NzTestCalendarDateCellComponent,
        NzTestCalendarDateFullCellComponent,
        NzTestCalendarMonthCellComponent,
        NzTestCalendarMonthFullCellComponent,
        NzTestCalendarChangesComponent
      ],
      providers: [{ provide: NZ_DATE_CONFIG, useValue: { firstDayOfWeek: 0 } }]
    }).compileComponents();
  }));

  describe('mode', () => {
    let fixture: ComponentFixture<NzTestCalendarModeComponent>;
    let component: NzTestCalendarModeComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarModeComponent);
      component = fixture.componentInstance;
    }));

    it('should be month by default', () => {
      fixture.detectChanges();

      const header = fixture.debugElement
        .queryAll(By.directive(Calendar))[0]
        .query(By.directive(CalendarHeader))
        .injector.get(CalendarHeader);
      expect(header.mode).toBe('month');
    });

    it('should update mode passed in', () => {
      component.mode = 'year';

      fixture.detectChanges();

      const header = fixture.debugElement
        .queryAll(By.directive(Calendar))[1]
        .query(By.directive(CalendarHeader))
        .injector.get(CalendarHeader);
      expect(header.mode).toBe('year');
    });

    it('should emit change event for mode selection', () => {
      const header = fixture.debugElement
        .queryAll(By.directive(Calendar))[1]
        .query(By.directive(CalendarHeader))
        .injector.get(CalendarHeader);
      header.modeChange.emit('year');

      fixture.detectChanges();

      expect(component.mode).toBe('year');
    });

    it('should display date grid in month mode', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const table = host.query(By.css('table'));

      expect(table.nativeElement.className).toContain('ant-fullcalendar-table');
    });

    it('should display date grid in year mode', () => {
      component.mode = 'year';
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const table = host.query(By.css('table'));

      expect(table.nativeElement.className).toContain('ant-fullcalendar-month-panel-table');
    });
  });

  describe('value', () => {
    let fixture: ComponentFixture<NzTestCalendarValueComponent>;
    let component: NzTestCalendarValueComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarValueComponent);
      component = fixture.componentInstance;
    }));

    it('should be now by default', () => {
      const now = new Date();

      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const header = host.query(By.directive(CalendarHeader)).injector.get(CalendarHeader);

      expect(header.activeDate.getYear()).toBe(now.getFullYear());
      expect(header.activeDate.getMonth()).toBe(now.getMonth());
      expect(header.activeDate.getDate()).toBe(now.getDate());
    });

    it('should support two-way binding without model', () => {
      fixture.detectChanges();
      const now = new Date();

      const calendar = fixture.debugElement.queryAll(By.directive(Calendar))[1].injector.get(Calendar);

      expect(calendar.activeDate.nativeDate).toBe(component.date0);

      calendar.onDateSelect(new CandyDate(now));
      fixture.detectChanges();

      expect(component.date0).toBe(now);
    });

    it('should support model binding', fakeAsync(() => {
      fixture.detectChanges();
      const now = new Date();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[2];
      const calendar = host.injector.get(Calendar);
      const model = host.injector.get(NgModel);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(calendar.activeDate.nativeDate).toBe(component.date1);

      model.viewToModelUpdate(now);
      fixture.detectChanges();

      expect(component.date1).toBe(now);
    }));

    it('should update value when year changed', () => {
      fixture.detectChanges();
      const calendar = fixture.debugElement.queryAll(By.directive(Calendar))[1].injector.get(Calendar);
      calendar.onYearSelect(2010);
      fixture.detectChanges();

      expect(component.date0.getFullYear()).toBe(2010);
    });

    it('should update value when month changed', () => {
      fixture.detectChanges();
      const calendar = fixture.debugElement.queryAll(By.directive(Calendar))[1].injector.get(Calendar);
      calendar.onMonthSelect(10);
      fixture.detectChanges();

      expect(component.date0.getMonth()).toBe(10);
    });

    it('should mark current date in month mode', () => {
      const now = new Date();

      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const cells = host.queryAll(By.css('td'));
      const today = cells.find(x => x.nativeElement.className.indexOf('ant-fullcalendar-today') > 0)!;

      expect(today).toBeDefined();
      expect(parseInt(today.nativeElement.textContent!, 10)).toBe(now.getDate());
    });

    it('should mark active date in month mode', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const cells = host.queryAll(By.css('td'));
      const active = cells.find(x => x.nativeElement.className.indexOf('ant-fullcalendar-selected-day') > 0)!;

      expect(active).toBeDefined();
      expect(parseInt(active.nativeElement.textContent!, 10)).toBe(3);
    });

    it('should mark previous/next month date in month mode', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const cells = host.queryAll(By.css('td'));
      const lastPrevious = cells[3];
      const firstNext = cells[32];

      expect(lastPrevious.nativeElement.className).toContain('ant-fullcalendar-last-month-cell');
      expect(firstNext.nativeElement.className).toContain('ant-fullcalendar-next-month-btn-day');
    });

    it('should mark current month in year mode', () => {
      const now = new Date();
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[3];
      const cells = host.queryAll(By.css('td'));
      const current = cells[now.getMonth()];

      expect(current.nativeElement.className).toContain('ant-fullcalendar-month-panel-current-cell');
    });

    it('should mark active month in year mode', () => {
      component.date2.setDate(1);
      component.date2.setMonth(10);
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[3];
      const cells = host.queryAll(By.css('td'));
      const current = cells[10];

      expect(current.nativeElement.className).toContain('ant-fullcalendar-month-panel-selected-cell');
    });
  });

  describe('fullscreen', () => {
    let fixture: ComponentFixture<NzTestCalendarFullscreenComponent>;
    let component: NzTestCalendarFullscreenComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarFullscreenComponent);
      component = fixture.componentInstance;
    }));

    it('should be true by default', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const header = host.query(By.directive(CalendarHeader)).injector.get(CalendarHeader);

      expect(header.fullscreen).toBe(true);
    });

    it('should update fullscreen by nzFullscreen', () => {
      component.fullscreen = false;

      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const header = host.query(By.directive(CalendarHeader)).injector.get(CalendarHeader);

      expect(header.fullscreen).toBe(false);
    });

    it('should update fullscreen by nzCard', () => {
      component.card = true;

      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[2];
      const header = host.query(By.directive(CalendarHeader)).injector.get(CalendarHeader);

      expect(header.fullscreen).toBe(false);
    });

    it('should support imperative access', () => {
      component.fullscreen = false;

      fixture.detectChanges();

      const calendar = fixture.debugElement.queryAll(By.directive(Calendar))[1].injector.get(Calendar);

      expect(calendar.nzFullscreen).toBe(false);
      expect(calendar.nzCard).toBe(true);
    });
  });

  describe('dateCell', () => {
    let fixture: ComponentFixture<NzTestCalendarDateCellComponent>;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarDateCellComponent);
    }));

    it('should work when passed via property', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const content = host.query(By.css('td')).query(By.css('.ant-fullcalendar-content'));

      expect(content.nativeElement.textContent).toContain('Foo');
    });

    it('should work when passed via content child', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const content = host.query(By.css('td')).query(By.css('.ant-fullcalendar-content'));

      expect(content.nativeElement.textContent).toContain('Bar');
    });
  });

  describe('dateFullCell', () => {
    let fixture: ComponentFixture<NzTestCalendarDateFullCellComponent>;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarDateFullCellComponent);
    }));

    it('should work when passed via property', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const content = host.query(By.css('td')).query(By.css('.ant-fullcalendar-date'));

      expect(content.nativeElement.textContent!.trim()).toBe('Foo');
    });

    it('should work when passed via content child', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const content = host.query(By.css('td')).query(By.css('.ant-fullcalendar-date'));

      expect(content.nativeElement.textContent!.trim()).toBe('Bar');
    });
  });

  describe('monthCell', () => {
    let fixture: ComponentFixture<NzTestCalendarMonthCellComponent>;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarMonthCellComponent);
    }));

    it('should work when passed via property', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const content = host.query(By.css('td')).query(By.css('.ant-fullcalendar-content'));

      expect(content.nativeElement.textContent).toContain('Foo');
    });

    it('should work when passed via content child', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const content = host.query(By.css('td')).query(By.css('.ant-fullcalendar-content'));

      expect(content.nativeElement.textContent).toContain('Bar');
    });
  });

  describe('monthFullCell', () => {
    let fixture: ComponentFixture<NzTestCalendarMonthFullCellComponent>;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarMonthFullCellComponent);
    }));

    it('should work when passed via property', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const content = host.query(By.css('td')).query(By.css('.ant-fullcalendar-month'));

      expect(content.nativeElement.textContent!.trim()).toBe('Foo');
    });

    it('should work when passed via content child', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const content = host.query(By.css('td')).query(By.css('.ant-fullcalendar-month'));

      expect(content.nativeElement.textContent!.trim()).toBe('Bar');
    });
  });

  describe('changes', () => {
    let fixture: ComponentFixture<NzTestCalendarChangesComponent>;
    let component: NzTestCalendarChangesComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(NzTestCalendarChangesComponent);
      component = fixture.componentInstance;
    }));

    it('should panelChange work', fakeAsync(() => {
      fixture.detectChanges();

      expect(component.panelChange).toHaveBeenCalledTimes(0);

      const calendar = fixture.debugElement.queryAll(By.directive(Calendar))[0].injector.get(Calendar);
      calendar.onModeChange('year');
      fixture.detectChanges();

      expect(component.panelChange).toHaveBeenCalledTimes(1);
    }));

    it('should selectChange work', () => {
      fixture.detectChanges();

      expect(component.panelChange).toHaveBeenCalledTimes(0);

      const calendar = fixture.debugElement.queryAll(By.directive(Calendar))[0].injector.get(Calendar);
      calendar.onYearSelect(2019);
      fixture.detectChanges();

      expect(component.selectChange).toHaveBeenCalledTimes(1);

      calendar.onMonthSelect(2);
      fixture.detectChanges();

      expect(component.selectChange).toHaveBeenCalledTimes(2);
    });
  });
});

@Component({
  template: `
    <nz-calendar></nz-calendar>
    <nz-calendar [(nzMode)]="mode"></nz-calendar>
  `
})
class NzTestCalendarModeComponent {
  mode: 'month' | 'year' = 'month';
}

@Component({
  template: `
    <nz-calendar></nz-calendar>
    <nz-calendar [(nzValue)]="date0"></nz-calendar>
    <nz-calendar [(ngModel)]="date1"></nz-calendar>
    <nz-calendar [(nzValue)]="date2" [(nzMode)]="mode"></nz-calendar>
  `
})
class NzTestCalendarValueComponent {
  date0 = new Date(2001, 1, 3);
  date1 = new Date(2001, 1, 3);
  date2 = new Date();
  mode = 'year';
}

@Component({
  template: `
    <nz-calendar></nz-calendar>
    <nz-calendar [nzFullscreen]="fullscreen"></nz-calendar>
    <nz-calendar [nzCard]="card"></nz-calendar>
  `
})
class NzTestCalendarFullscreenComponent {
  fullscreen = true;
  card = false;
}

@Component({
  template: `
    <nz-calendar [nzDateCell]="tpl"></nz-calendar>
    <ng-template #tpl>Foo</ng-template>
    <nz-calendar>
      <ng-container *nzDateCell>Bar</ng-container>
    </nz-calendar>
  `
})
class NzTestCalendarDateCellComponent {}

@Component({
  template: `
    <nz-calendar [nzDateFullCell]="tpl"></nz-calendar>
    <ng-template #tpl>Foo</ng-template>
    <nz-calendar>
      <ng-container *nzDateFullCell>Bar</ng-container>
    </nz-calendar>
  `
})
class NzTestCalendarDateFullCellComponent {}

@Component({
  template: `
    <nz-calendar nzMode="year" [nzMonthCell]="tpl"></nz-calendar>
    <ng-template #tpl>Foo</ng-template>
    <nz-calendar nzMode="year">
      <ng-container *nzMonthCell>Bar</ng-container>
    </nz-calendar>
  `
})
class NzTestCalendarMonthCellComponent {}

@Component({
  template: `
    <nz-calendar nzMode="year" [nzMonthFullCell]="tpl"></nz-calendar>
    <ng-template #tpl>Foo</ng-template>
    <nz-calendar nzMode="year">
      <ng-container *nzMonthFullCell>Bar</ng-container>
    </nz-calendar>
  `
})
class NzTestCalendarMonthFullCellComponent {}

@Component({
  template: `
    <nz-calendar
      [(nzMode)]="mode"
      [(ngModel)]="date0"
      (nzPanelChange)="panelChange($event)"
      (nzSelectChange)="selectChange($event)"
    >
    </nz-calendar>
  `
})
class NzTestCalendarChangesComponent {
  mode: 'month' | 'year' = 'month';
  date0 = new Date(2014, 3, 14);
  panelChange = jasmine.createSpy('panelChange callback');
  selectChange = jasmine.createSpy('selectChange callback');
}
