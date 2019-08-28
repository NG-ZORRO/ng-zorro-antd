import { Component, DebugElement, Type } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzTimeRangeChange, NzTimeRangeComponent } from './nz-time-range.component';
import { NzTimeRangeModule } from './nz-time-range.module';

describe('nz time range', () => {
  // tslint:disable-next-line no-any
  function configureTimeRangeTestingModule(declarations: Array<Type<any>>): void {
    TestBed.configureTestingModule({
      imports: [NzTimeRangeModule],
      declarations: declarations
    }).compileComponents();
  }

  let fixture: ComponentFixture<NzTestTimeRangeComponent>;
  let testComponent: NzTestTimeRangeComponent;
  let targetComponent: DebugElement;

  beforeEach(() => {
    configureTimeRangeTestingModule([NzTestTimeRangeComponent]);
  });

  describe('basic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimeRangeComponent);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      targetComponent = fixture.debugElement.query(By.directive(NzTimeRangeComponent));
    });

    it('should render correctly', () => {
      expect(targetComponent.nativeElement.classList).toContain('ant-time-range');
    });

    it('should support derived range', () => {});
  });

  describe('auto refresh', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimeRangeComponent);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      targetComponent = fixture.debugElement.query(By.directive(NzTimeRangeComponent));
    });

    it('should work', fakeAsync(() => {
      testComponent.autoRefresh = true;
      fixture.detectChanges();

      expect(testComponent.rangeChangeCount).toBe(1);
      fixture.detectChanges();
      tick(6000);
      fixture.detectChanges();

      expect(testComponent.rangeChangeCount).toBe(2);

      testComponent.autoRefresh = false;
      fixture.detectChanges();
    }));

    it('should stop when prop is set to false', fakeAsync(() => {
      testComponent.autoRefresh = true;
      fixture.detectChanges();

      testComponent.autoRefresh = false;
      fixture.detectChanges();

      expect(testComponent.rangeChangeCount).toBe(1);

      fixture.detectChanges();
      tick(6000);
      fixture.detectChanges();
      expect(testComponent.rangeChangeCount).toBe(1);
    }));
  });
});

@Component({
  template: `
    <nz-time-range
      [(nzRange)]="range"
      [nzRanges]="ranges"
      [nzAutoRefresh]="autoRefresh"
      [nzAutoRefreshInterval]="5000"
      (nzTimeRangeChange)="onTimeRangeChange($event)"
    >
    </nz-time-range>
  `
})
export class NzTestTimeRangeComponent {
  autoRefresh = false;
  rangeChangeCount = 0;
  range?: number = 60000;
  ranges: number[] = [600000, 3600000, 21600000];

  onTimeRangeChange(_change: NzTimeRangeChange): void {
    this.rangeChangeCount += 1;
  }
}
