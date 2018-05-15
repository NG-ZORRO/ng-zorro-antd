// import { OverlayContainer } from '@angular/cdk/overlay';
// import { registerLocaleData } from '@angular/common';
// import zh from '@angular/common/locales/zh';
// import { Component, DebugElement } from '@angular/core';
// import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
//
// import { dispatchMouseEvent } from '../core/testing';
// import { NzDatePickerModule } from './date-picker.module';
//
// registerLocaleData(zh);
//
// describe('NzWeekPickerComponent', () => {
//   let fixture: ComponentFixture<NzTestWeekPickerComponent>;
//   let fixtureInstance: NzTestWeekPickerComponent;
//   let overlayContainer: OverlayContainer;
//   let overlayContainerElement: HTMLElement;
//   let debugElement: DebugElement;
//
//   beforeEach(fakeAsync(() => {
//     TestBed.configureTestingModule({
//       imports     : [ NoopAnimationsModule, NzDatePickerModule ],
//       declarations: [ NzTestWeekPickerComponent ]
//     });
//
//     TestBed.compileComponents();
//   }));
//
//   beforeEach(inject([ OverlayContainer ], (oc: OverlayContainer) => {
//     overlayContainer = oc;
//     overlayContainerElement = oc.getContainerElement();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(NzTestWeekPickerComponent);
//     fixtureInstance = fixture.componentInstance;
//     debugElement = fixture.debugElement;
//   });
//
//   afterEach(() => {
//     overlayContainer.ngOnDestroy();
//   });
//   it('should show week num', fakeAsync(() => {
//     fixtureInstance.nzFormat = null; // cover branch
//     fixture.detectChanges();
//     tick(3000);
//     fixture.detectChanges();
//     openPickerByClickTrigger();
//     tick(3000);
//     fixture.detectChanges();
//     expect(queryFromOverlay('.ant-calendar-week-number-cell')).toBeDefined();
//   }));
//
//   ////////////
//
//   function getPickerTrigger(): HTMLInputElement {
//     return debugElement.query(By.css('nz-picker input.ant-calendar-picker-input')).nativeElement as HTMLInputElement;
//   }
//
//   function queryFromOverlay(selector: string): HTMLElement {
//     return overlayContainerElement.querySelector(selector) as HTMLElement;
//   }
//
//   function openPickerByClickTrigger(): void {
//     dispatchMouseEvent(getPickerTrigger(), 'click');
//     fixture.detectChanges();
//   }
//
// });
//
// @Component({
//   template: `
//     <nz-week-picker [nzFormat]="nzFormat"></nz-week-picker>
//   `
// })
// export class NzTestWeekPickerComponent {
//   nzFormat;
// }
