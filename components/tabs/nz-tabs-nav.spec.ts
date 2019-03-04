import { Direction, Directionality } from '@angular/cdk/bidi';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule, VIEWPORT_RULER_PROVIDER } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  async,
  discardPeriodicTasks,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { dispatchFakeEvent } from '../core/testing';

import { NzTabsNavComponent } from './nz-tabs-nav.component';
import { NzTabsModule } from './nz-tabs.module';

describe('tabs nav', () => {
  let dir: Direction = 'ltr';
  const change = new Subject();
  let fixture: ComponentFixture<NzTestTabNavComponent>;
  let appComponent: NzTestTabNavComponent;

  beforeEach(async(() => {
    dir = 'ltr';
    TestBed.configureTestingModule({
      imports     : [ CommonModule, PortalModule, NzTabsModule, ScrollDispatchModule ],
      declarations: [
        NzTestTabNavComponent
      ],
      providers   : [
        VIEWPORT_RULER_PROVIDER,
        { provide: Directionality, useFactory: () => ({ value: dir, change: change.asObservable() }) }
      ]
    });

    TestBed.compileComponents();
  }));

  describe('tabs paginate', () => {
    describe('ltr', () => {
      beforeEach(() => {
        dir = 'ltr';
        fixture = TestBed.createComponent(NzTestTabNavComponent);
        fixture.detectChanges();

        appComponent = fixture.componentInstance;

      });
      it('should scroll click emit', () => {
        const nav = fixture.debugElement.query(By.directive(NzTabsNavComponent));
        appComponent.addTabsForScrolling();
        fixture.detectChanges();
        appComponent.nzTabsNavComponent.selectedIndex = 4;
        fixture.detectChanges();
        expect(appComponent.onNextClick).toHaveBeenCalledTimes(0);
        expect(appComponent.onPrevClick).toHaveBeenCalledTimes(0);
        nav.nativeElement.querySelector('.ant-tabs-tab-prev').click();
        fixture.detectChanges();
        expect(appComponent.onPrevClick).toHaveBeenCalledTimes(1);
        nav.nativeElement.querySelector('.ant-tabs-tab-next').click();
        fixture.detectChanges();
        expect(appComponent.onNextClick).toHaveBeenCalledTimes(1);
      });
      it('should scroll to show the focused tab label', () => {
        appComponent.addTabsForScrolling();
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance).toBe(0);

        // Focus on the last tab, expect this to be the maximum scroll distance.
        appComponent.nzTabsNavComponent.selectedIndex = appComponent.tabs.length - 1;
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance)
        .toBe(appComponent.nzTabsNavComponent.getMaxScrollDistance());

        // Focus on the first tab, expect this to be the maximum scroll distance.
        appComponent.nzTabsNavComponent.selectedIndex = 0;
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance).toBe(0);
      });
    });

    describe('rtl', () => {
      beforeEach(() => {
        dir = 'rtl';
        fixture = TestBed.createComponent(NzTestTabNavComponent);
        appComponent = fixture.componentInstance;
        appComponent.dir = 'rtl';

        fixture.detectChanges();
      });

      it('should scroll to show the focused tab label', () => {
        appComponent.addTabsForScrolling();
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance).toBe(0);

        // Focus on the last tab, expect this to be the maximum scroll distance.
        appComponent.nzTabsNavComponent.selectedIndex = appComponent.tabs.length - 1;
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance)
        .toBe(appComponent.nzTabsNavComponent.getMaxScrollDistance());

        // Focus on the first tab, expect this to be the maximum scroll distance.
        appComponent.nzTabsNavComponent.selectedIndex = 0;
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance).toBe(0);
      });
    });

    it('should re-align the ink bar when the direction changes', fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTabNavComponent);

      const inkBar = fixture.componentInstance.nzTabsNavComponent.nzTabsInkBarDirective;
      spyOn(inkBar, 'alignToElement');

      fixture.detectChanges();

      change.next();
      fixture.detectChanges();
      tick(20); // Angular turns rAF calls into 16.6ms timeouts in tests.

      expect(inkBar.alignToElement).toHaveBeenCalled();
    }));

    it('should re-align the ink bar when the window is resized', fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTabNavComponent);
      fixture.detectChanges();

      const inkBar = fixture.componentInstance.nzTabsNavComponent.nzTabsInkBarDirective;

      spyOn(inkBar, 'alignToElement');

      dispatchFakeEvent(window, 'resize');
      tick(150);
      fixture.detectChanges();

      expect(inkBar.alignToElement).toHaveBeenCalled();
      discardPeriodicTasks();
    }));

    it('should update arrows when the window is resized', fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTabNavComponent);

      const header = fixture.componentInstance.nzTabsNavComponent;

      spyOn(header, 'checkPaginationEnabled');

      dispatchFakeEvent(window, 'resize');
      tick(10);
      fixture.detectChanges();

      expect(header.checkPaginationEnabled).toHaveBeenCalled();
      discardPeriodicTasks();
    }));

  });
});

@Component({
  selector     : 'nz-test-tab-nav',
  template     : `
    <div [dir]="dir" style="width: 130px;">
      <div nz-tabs-nav
        role="tablist"
        tabindex="0"
        [selectedIndex]="selectedIndex"
        (nzOnNextClick)="onNextClick()"
        (nzOnPrevClick)="onPrevClick()">
        <div
          *ngFor="let tab of tabs"
          nz-tab-label
          role="tab">
          {{tab.label}}
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    '../style/index.less',
    './style/index.less'
  ]
})
class NzTestTabNavComponent {
  selectedIndex: number = 0;
  tabs = [ { label: 'tab one' }, { label: 'tab one' }, { label: 'tab one' }, { label: 'tab one' } ];
  dir: Direction = 'ltr';
  onNextClick = jasmine.createSpy('next click change');
  onPrevClick = jasmine.createSpy('pre click change');

  @ViewChild(NzTabsNavComponent) nzTabsNavComponent: NzTabsNavComponent;

  addTabsForScrolling(): void {
    this.tabs.push({ label: 'new' }, { label: 'new' }, { label: 'new' }, { label: 'new' });
  }
}
