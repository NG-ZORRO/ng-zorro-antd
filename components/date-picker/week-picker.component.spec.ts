import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { getPickerInput } from 'ng-zorro-antd/date-picker/testing/util';
import { NzDatePickerModule } from './date-picker.module';

describe('NzWeekPickerComponent', () => {
  let fixture: ComponentFixture<NzTestWeekPickerComponent>;
  let fixtureInstance: NzTestWeekPickerComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NzDatePickerModule, FormsModule],
      declarations: [NzTestWeekPickerComponent]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestWeekPickerComponent);
    fixtureInstance = fixture.componentInstance;
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should show week num', fakeAsync(() => {
    fixtureInstance.nzFormat = undefined; // cover branch
    fixture.detectChanges();
    openPickerByClickTrigger();
    expect(queryFromOverlay('.ant-picker-week-panel-row .ant-picker-cell-week')).toBeDefined();
  }));

  it('should change input value when click week', fakeAsync(() => {
    fixtureInstance.nzValue = new Date('2020-02-25');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    openPickerByClickTrigger();
    dispatchMouseEvent(queryFromOverlay('.ant-picker-cell'), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(getPickerInput(fixture.debugElement).value).toBe('2020-05');
  }));

  it('should change panel to week from month', fakeAsync(() => {
    fixtureInstance.nzValue = new Date('2020-02-25');
    fixture.detectChanges();
    openPickerByClickTrigger();
    dispatchMouseEvent(queryFromOverlay('.ant-picker-header-month-btn'), 'click');
    fixture.detectChanges();
    dispatchMouseEvent(queryFromOverlay('.ant-picker-cell'), 'click');
    fixture.detectChanges();
    expect(queryFromOverlay('.ant-picker-week-panel')).toBeTruthy();
  }));

  ////////////

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  function openPickerByClickTrigger(): void {
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }
});

@Component({
  template: `
    <nz-date-picker nzMode="week" [nzFormat]="nzFormat" [ngModel]="nzValue"></nz-date-picker>
  `
})
export class NzTestWeekPickerComponent {
  nzFormat?: string;
  nzValue: Date | null = null;
}
