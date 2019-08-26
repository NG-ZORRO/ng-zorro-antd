import { DebugElement, Type } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzDemoTimeRangeBasicComponent } from './demo/basic';
import { NzTimeRangeComponent } from './nz-time-range.component';
import { NzTimeRangeModule } from './nz-time-range.module';

describe('nz time range', () => {
  // tslint:disable-next-line no-any
  function configureTimeRangeTestingModule(declarations: Array<Type<any>>): void {
    TestBed.configureTestingModule({
      imports: [NzTimeRangeModule],
      declarations: declarations
    }).compileComponents();
  }

  describe('basic', () => {
    let fixture: ComponentFixture<NzDemoTimeRangeBasicComponent>;
    // let testComponent: NzDemoTimeRangeBasicComponent;
    let targetComponent: DebugElement;

    beforeEach(() => {
      configureTimeRangeTestingModule([NzDemoTimeRangeBasicComponent]);

      fixture = TestBed.createComponent(NzDemoTimeRangeBasicComponent);
      fixture.detectChanges();

      // testComponent = fixture.debugElement.componentInstance;
      targetComponent = fixture.debugElement.query(By.directive(NzTimeRangeComponent));
    });

    it('should render correctly', fakeAsync(() => {
      expect(targetComponent.nativeElement.classList).toContain('ant-time-range');
    }));
  });

  describe('auto update', () => {});
});
