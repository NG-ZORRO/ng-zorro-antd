import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { getPickerInput } from 'ng-zorro-antd/date-picker/testing/util';

import { NzDatePickerModule } from './date-picker.module';

describe('NzQuarterPickerComponent', () => {
  let fixture: ComponentFixture<NzTestQuarterPickerComponent>;
  let fixtureInstance: NzTestQuarterPickerComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NzDatePickerModule, FormsModule],
      declarations: [NzTestQuarterPickerComponent]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestQuarterPickerComponent);
    fixtureInstance = fixture.componentInstance;
    // set initial mode
    fixtureInstance.useSuite = 1;
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should show quarter panel', fakeAsync(() => {
    fixtureInstance.nzFormat = undefined; // cover branch
    fixture.detectChanges();
    openPickerByClickTrigger();
    expect(queryFromOverlay('.ant-picker-quarter-panel')).toBeDefined();
  }));

  it('should change input value when click quarter', fakeAsync(() => {
    fixtureInstance.nzValue = new Date('2024-04-04');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    openPickerByClickTrigger();
    dispatchMouseEvent(queryFromOverlay('.ant-picker-cell'), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(getPickerInput(fixture.debugElement).value).toBe('2024-Q1');
  }));

  it('should specified date provide by "value" be choosed', fakeAsync(() => {
    fixtureInstance.useSuite = 3;
    fixtureInstance.nzValue = new Date('2024-04-30');
    fixture.detectChanges();
    flush(); // Wait writeValue() tobe done
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    var sss = queryFromOverlay('.ant-picker-quarter-panel td.ant-picker-cell-selected');
    console.log(sss);
    expect(queryFromOverlay('.ant-picker-quarter-panel td.ant-picker-cell-selected').textContent).toContain('Q2');

    // Click the first cell to change ngModel
    const cell = queryFromOverlay('.ant-picker-quarter-panel td.ant-picker-cell:nth-child(1) .ant-picker-cell-inner');
    const cellText = cell.textContent!.trim();
    dispatchMouseEvent(cell, 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(`Q${new CandyDate(fixtureInstance.nzValue).setMonth(0).getQuarter().toString()}`).toBe(cellText);
  }));

  it('should nz-quarter-picker work', fakeAsync(() => {
    fixtureInstance.useSuite = 2;
    fixture.whenRenderingDone().then(() => {
      tick(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      dispatchMouseEvent(queryFromOverlay('.ant-picker-cell'), 'click');
      tick(500);
      expect(getPickerContainer()).not.toBeNull();
      const pickerInput = getPickerInput(fixture.debugElement);
      expect(pickerInput).not.toBeNull(); //
    });
  }));

  it('should nz-range-picker "nzValue" work', fakeAsync(() => {
    fixtureInstance.useSuite = 4;
    fixtureInstance.nzValue = [new Date('2024-04-30'), new Date('2025-12-30')];
    fixture.whenRenderingDone().then(() => {
      tick(500);
      fixture.detectChanges();
      const panels = overlayContainerElement.querySelectorAll('.ant-picker-quarter-panel');
      expect(panels).not.toBeNull();
      expect(panels.length).toBe(2);

      tick(500);
      fixture.detectChanges();
      const firstCell = panels[0].querySelector('td.ant-picker-cell-selected')!;
      expect(firstCell).not.toBeNull();
      expect(firstCell.textContent!.trim()).toBe('Q2');

      const secondCell = panels[1].querySelector('td.ant-picker-cell-selected')!;
      expect(secondCell).not.toBeNull();
      expect(secondCell.textContent!.trim()).toBe('Q4');
    });
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

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay('.ant-picker-quarter-panel') as HTMLElement;
  }
});

@Component({
  template: `
    @switch (useSuite) {
      @case (1) {
        <nz-date-picker nzMode="quarter" [nzFormat]="nzFormat!" [ngModel]="nzValue" />
      }
      @case (2) {
        <nz-quarter-picker [ngModel]="nzValue" />
      }
      @case (3) {
        <nz-quarter-picker [ngModel]="nzValue" nzOpen />
      }
      @case (4) {
        <nz-range-picker nzMode="quarter" [ngModel]="nzValue" nzOpen />
      }
    }
  `
})
export class NzTestQuarterPickerComponent {
  useSuite!: 1 | 2 | 3 | 4;
  nzFormat?: string;
  nzValue: Date | Date[] | null = null;
}
