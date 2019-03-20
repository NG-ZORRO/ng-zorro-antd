import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild, ViewEncapsulation } from '@angular/core';
import { async, fakeAsync, flush, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzTimePickerPanelComponent } from './nz-time-picker-panel.component';

describe('time-picker-panel', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ FormsModule, NzI18nModule ],
      schemas     : [ NO_ERRORS_SCHEMA ],
      declarations: [ NzTimePickerPanelComponent, NzTestTimePanelComponent, NzTestTimePanelDisabledComponent, NzTest12HourTimePanelComponent ]
    });
    TestBed.compileComponents();
  }));

  describe('basic time-picker-panel', () => {
    let fixture: ComponentFixture<NzTestTimePanelComponent>;
    let testComponent: NzTestTimePanelComponent;
    let panelElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimePanelComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      panelElement = fixture.debugElement.query(By.directive(NzTimePickerPanelComponent));
    });

    it('should init correct', () => {
      fixture.detectChanges();
      expect(panelElement.nativeElement.classList).toContain('ant-time-picker-panel');
    });

    it('should format work', () => {
      fixture.detectChanges();
      expect(testComponent.nzTimePickerPanelComponent.hourEnabled).toBe(true);
      expect(testComponent.nzTimePickerPanelComponent.minuteEnabled).toBe(true);
      expect(testComponent.nzTimePickerPanelComponent.secondEnabled).toBe(true);
      expect(testComponent.nzTimePickerPanelComponent.enabledColumns).toBe(3);
      testComponent.format = 'HH:mm';
      fixture.detectChanges();
      expect(testComponent.nzTimePickerPanelComponent.hourEnabled).toBe(true);
      expect(testComponent.nzTimePickerPanelComponent.minuteEnabled).toBe(true);
      expect(testComponent.nzTimePickerPanelComponent.secondEnabled).toBe(false);
      expect(testComponent.nzTimePickerPanelComponent.enabledColumns).toBe(2);
      testComponent.format = null;
      fixture.detectChanges();
      expect(testComponent.nzTimePickerPanelComponent.hourEnabled).toBe(true);
      expect(testComponent.nzTimePickerPanelComponent.minuteEnabled).toBe(true);
      expect(testComponent.nzTimePickerPanelComponent.secondEnabled).toBe(false);
      expect(testComponent.nzTimePickerPanelComponent.enabledColumns).toBe(2);
    });
    it('should default open value work', fakeAsync(() => {
      testComponent.nzTimePickerPanelComponent.opened = true;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      let listOfSelectedLi = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select-option-selected');
      expect(listOfSelectedLi[ 0 ].innerText).toBe('10');
      expect(listOfSelectedLi[ 1 ].innerText).toBe('11');
      expect(listOfSelectedLi[ 2 ].innerText).toBe('12');
      listOfSelectedLi.forEach((li: HTMLElement) => {
        expect(li.parentElement!.parentElement!.scrollTop).toBe(li.offsetTop);
      });
      testComponent.value = new Date(0, 0, 0, 8, 9, 10);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      flush();
      listOfSelectedLi = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select-option-selected');
      expect(listOfSelectedLi[ 0 ].innerText).toBe('08');
      expect(listOfSelectedLi[ 1 ].innerText).toBe('09');
      expect(listOfSelectedLi[ 2 ].innerText).toBe('10');
    }));
    it('should select scroll work', fakeAsync(() => {
      testComponent.value = new Date(0, 0, 0, 8, 9, 10);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      flush();
      let listOfSelectedLi = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select-option-selected');
      expect(listOfSelectedLi[ 0 ].innerText).toBe('08');
      expect(listOfSelectedLi[ 1 ].innerText).toBe('09');
      expect(listOfSelectedLi[ 2 ].innerText).toBe('10');
      testComponent.nzTimePickerPanelComponent.selectHour({ index: 0, disabled: false });
      testComponent.nzTimePickerPanelComponent.selectMinute({ index: 1, disabled: false });
      testComponent.nzTimePickerPanelComponent.selectSecond({ index: 2, disabled: false });
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      flush();
      listOfSelectedLi = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select-option-selected');
      expect(listOfSelectedLi[ 0 ].innerText).toBe('00');
      expect(listOfSelectedLi[ 1 ].innerText).toBe('01');
      expect(listOfSelectedLi[ 2 ].innerText).toBe('02');
    }));
    it('should step work', () => {
      fixture.detectChanges();
      let listOfSelectContainer = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select');
      expect(listOfSelectContainer[ 0 ].firstElementChild.children.length).toEqual(24);
      expect(listOfSelectContainer[ 1 ].firstElementChild.children.length).toEqual(60);
      expect(listOfSelectContainer[ 2 ].firstElementChild.children.length).toEqual(60);
      testComponent.hourStep = 2;
      testComponent.minuteStep = 15;
      testComponent.secondStep = 10;
      fixture.detectChanges();
      listOfSelectContainer = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select');
      expect(listOfSelectContainer[ 0 ].firstElementChild.children.length).toEqual(12);
      expect(listOfSelectContainer[ 1 ].firstElementChild.children.length).toEqual(4);
      expect(listOfSelectContainer[ 2 ].firstElementChild.children.length).toEqual(6);
    });

  });
  describe('disabled time-picker-panel', () => {
    let fixture: ComponentFixture<NzTestTimePanelDisabledComponent>;
    let testComponent: NzTestTimePanelDisabledComponent;
    let panelElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimePanelDisabledComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      panelElement = fixture.debugElement.query(By.directive(NzTimePickerPanelComponent));
    });

    it('should disabled work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      flush();
      const listOfSelectContainer = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select');
      expect(listOfSelectContainer[ 0 ].querySelectorAll('.ant-time-picker-panel-select-option-disabled').length).toBe(3);
      expect(listOfSelectContainer[ 1 ].querySelectorAll('.ant-time-picker-panel-select-option-disabled').length).toBe(0);
      expect(listOfSelectContainer[ 2 ].querySelectorAll('.ant-time-picker-panel-select-option-disabled').length).toBe(0);
      testComponent.nzTimePickerPanelComponent.selectHour({ index: 4, disabled: false });
      fixture.detectChanges();
      expect(listOfSelectContainer[ 1 ].querySelectorAll('.ant-time-picker-panel-select-option-disabled').length).toBe(6);
      testComponent.nzTimePickerPanelComponent.selectHour({ index: 5, disabled: false });
      testComponent.nzTimePickerPanelComponent.selectMinute({ index: 1, disabled: false });
      fixture.detectChanges();
      expect(listOfSelectContainer[ 2 ].querySelectorAll('.ant-time-picker-panel-select-option-disabled').length).toBe(6);
      testComponent.hideDisabledOptions = true;
      fixture.detectChanges();
      expect(listOfSelectContainer[ 0 ].firstElementChild.children.length).toBe(21);
      expect(listOfSelectContainer[ 2 ].firstElementChild.children.length).toBe(54);
    }));
  });
  describe('12-hour time-picker-panel', () => {
    let panelElement: DebugElement;
    let fixture12Hour: ComponentFixture<NzTest12HourTimePanelComponent>;
    beforeEach(() => {
      fixture12Hour = TestBed.createComponent(NzTest12HourTimePanelComponent);
      testComponent = fixture12Hour.debugElement.componentInstance;
      fixture12Hour.detectChanges();
      panelElement = fixture12Hour.debugElement.query(By.directive(NzTimePickerPanelComponent));
    });
    it('basic 12-hour time-picker-panel', fakeAsync(() => {
      fixture12Hour.detectChanges();
      expect(testComponent.nzTimePickerPanelComponent.enabledColumns).toBe(4);
      const listColumns: HTMLElement[] = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select');
      expect(listColumns[0].querySelectorAll('li')[0].innerText).toBe('12');
      const hour12labels = listColumns[3].querySelectorAll('li');
      expect(hour12labels[0].innerText).toBe('am');
      expect(hour12labels[1].innerText).toBe('pm');
    }));
    it('default value 12-hour time-picker-panel', fakeAsync(() => {
      fixture12Hour.detectChanges();
      const listOfSelectedLi = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select-option-selected');
      expect(listOfSelectedLi[ 0 ].innerText).toBe('12');
      expect(listOfSelectedLi[ 1 ].innerText).toBe('00');
      expect(listOfSelectedLi[ 2 ].innerText).toBe('00');
      expect(listOfSelectedLi[ 3 ].innerText).toBe('am');
    }));
    it('select hour and 12-hour in 12-hour-time-picker-panel', fakeAsync(() => {
      fixture12Hour.detectChanges();
      testComponent.nzTimePickerPanelComponent.selectHour({ index: 3, disabled: false });
      testComponent.nzTimePickerPanelComponent.select12Hours({index: 1, value: 'pm'});
      fixture12Hour.detectChanges();
      expect(testComponent.value.getHours()).toBe(15);
    }));
    it('hour step in 12-hour-time-picker-panel', fakeAsync(() => {
      testComponent.hourStep = 2;
      fixture12Hour.detectChanges();
      const listOfHourContainer = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select');
      expect(listOfHourContainer[ 0 ].firstElementChild.children.length).toEqual(6);
    }));
    it('disabled hour in 12-hour-time-picker-panel', fakeAsync(() => {
      fixture12Hour.detectChanges();
      testComponent.disabledHours = () => [1, 3, 4, 5, 18, 19, 20];
      fixture12Hour.detectChanges();
      let listHourLi = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select')[0].querySelectorAll('li');
      expect(listHourLi[ 1 ].classList).toContain('ant-time-picker-panel-select-option-disabled');
      expect(listHourLi[ 3 ].classList).toContain('ant-time-picker-panel-select-option-disabled');
      expect(listHourLi[ 4 ].classList).toContain('ant-time-picker-panel-select-option-disabled');
      expect(listHourLi[ 5 ].classList).toContain('ant-time-picker-panel-select-option-disabled');
      testComponent.nzTimePickerPanelComponent.select12Hours({index: 1, value: 'pm'});
      fixture12Hour.detectChanges();
      listHourLi = panelElement.nativeElement.querySelectorAll('.ant-time-picker-panel-select')[0].querySelectorAll('li');
      expect(listHourLi[ 6 ].classList).toContain('ant-time-picker-panel-select-option-disabled');
      expect(listHourLi[ 7 ].classList).toContain('ant-time-picker-panel-select-option-disabled');
      expect(listHourLi[ 8 ].classList).toContain('ant-time-picker-panel-select-option-disabled');
    }));
  });
});

@Component({
  selector     : 'nz-test-time-panel',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <nz-time-picker-panel
      [(ngModel)]="value"
      [format]="format"
      [nzDefaultOpenValue]="openValue"
      [nzSecondStep]="secondStep"
      [nzMinuteStep]="minuteStep"
      [nzHourStep]="hourStep">
    </nz-time-picker-panel>`,
  styleUrls    : [
    '../style/index.less',
    './style/index.less'
  ]
})
export class NzTestTimePanelComponent {
  secondStep = 1;
  minuteStep = 1;
  hourStep = 1;
  @ViewChild(NzTimePickerPanelComponent) nzTimePickerPanelComponent: NzTimePickerPanelComponent;
  value: Date;
  openValue = new Date(0, 0, 0, 10, 11, 12);
  format: string | null = 'HH:mm:ss';
}

@Component({
  selector     : 'nz-test-time-panel-disabled',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <nz-time-picker-panel
      [(ngModel)]="value"
      [format]="format"
      [nzDisabledHours]="disabledHours"
      [nzDisabledMinutes]="disabledMinutes"
      [nzDisabledSeconds]="disabledSeconds"
      [nzDefaultOpenValue]="openValue"
      [nzSecondStep]="secondStep"
      [nzMinuteStep]="minuteStep"
      [nzInDatePicker]="inDatePicker"
      [nzHideDisabledOptions]="hideDisabledOptions"
      [nzHourStep]="hourStep">
    </nz-time-picker-panel>`,
  styleUrls    : [
    '../style/index.less',
    './style/index.less'
  ]
})
export class NzTestTimePanelDisabledComponent {
  inDatePicker = false;
  secondStep = 1;
  minuteStep = 1;
  hourStep = 1;
  hideDisabledOptions = false;
  @ViewChild(NzTimePickerPanelComponent) nzTimePickerPanelComponent: NzTimePickerPanelComponent;
  value = new Date(0, 0, 0, 0, 0, 0);
  openValue = new Date(0, 0, 0, 10, 11, 12);
  format = 'HH:mm:ss';

  disabledHours(): number[] {
    return [ 1, 2, 3 ];
  }

  disabledMinutes(hour: number): number[] {
    if (hour === 4) {
      return [ 20, 21, 22, 23, 24, 25 ];
    } else {
      return [];
    }
  }

  disabledSeconds(hour: number, minute: number): number[] {
    if ((hour === 5) && (minute === 1)) {
      return [ 20, 21, 22, 23, 24, 25 ];
    } else {
      return [];
    }
  }
}
@Component({
  selector     : 'nz-test-12-hour-time-panel',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <nz-time-picker-panel
      [(ngModel)]="value"
      [nzUse12Hours]="true"
      [nzDefaultOpenValue]="openValue"
      [nzDisabledHours]="disabledHours"
      [nzHourStep]="hourStep"
      [nzFormat]="format">
    </nz-time-picker-panel>`,
  styleUrls    : [
    '../style/index.less',
    './style/index.less'
  ]
})
export class NzTest12HourTimePanelComponent {
  @ViewChild(NzTimePickerPanelComponent) nzTimePickerPanelComponent: NzTimePickerPanelComponent;
  format = 'hh:mm:ss a';
  hourStep = 1;
  value;
  disabledHours = () => [];
  openValue = new Date(0, 0, 0, 0, 0, 0);
}
