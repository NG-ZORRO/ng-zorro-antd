import { Direction, Directionality } from '@angular/cdk/bidi';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule, VIEWPORT_RULER_PROVIDER } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { async, discardPeriodicTasks, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { dispatchFakeEvent } from 'ng-zorro-antd/core';

import { NzTabsNavComponent } from './nz-tabs-nav.component';
import { NzTabsModule } from './nz-tabs.module';
import { NzTabPositionMode } from './nz-tabset.component';

describe('tabs nav', () => {
  let dir: Direction = 'ltr';
  const change = new Subject();
  let fixture: ComponentFixture<NzTestTabNavComponent>;
  let appComponent: NzTestTabNavComponent;

  beforeEach(async(() => {
    dir = 'ltr';
    TestBed.configureTestingModule({
      imports: [CommonModule, PortalModule, NzTabsModule, ScrollDispatchModule],
      declarations: [NzTestTabNavComponent],
      providers: [
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
      it('should scroll to show the focused tab label in ltr direction', () => {
        appComponent.addTabsForScrolling();
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance).toBe(0);

        // Focus on the last tab, expect this to be the maximum scroll distance.
        appComponent.nzTabsNavComponent.selectedIndex = appComponent.tabs.length - 1;
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance).toBe(
          appComponent.nzTabsNavComponent.getMaxScrollDistance()
        );

        // Focus on the first tab, expect this to be the maximum scroll distance.
        appComponent.nzTabsNavComponent.selectedIndex = 0;
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance).toBe(0);
      });
      it('should has no padding right at the last tab in horizontal', () => {
        const _padding = 100;
        // Add Enough Tab
        const nav = fixture.debugElement.query(By.directive(NzTabsNavComponent));
        appComponent.addTabsForScrolling();
        fixture.detectChanges();
        // Modify nav container padding left and padding right
        const navContainer = fixture.debugElement.query(By.css('.ant-tabs-nav-container')).nativeElement;
        // The transition must be set to none, or the calculate of getComputedStyle() will equal to 0
        navContainer.style.transition = 'none';
        navContainer.style.paddingLeft = `${_padding}px`;
        navContainer.style.paddingRight = `${_padding}px`;
        // Focus on the last tab, expect the last tab offset right to be the nav container offset right.
        appComponent.nzTabsNavComponent.selectedIndex = appComponent.tabs.length - 1;
        fixture.detectChanges();
        // Caculate the scrolling element position right
        // Format: translate3d(xxxpx, 0px, 0px)
        const transformedNav: HTMLElement = nav.nativeElement.querySelector('.ant-tabs-nav');
        const transformedNavStyle = transformedNav.style.transform + '';
        const transformedNavTransformPix = parseInt(transformedNavStyle.split(',')[0].slice(12, -2), 10);
        const lastTabOffsetRight = transformedNav.clientLeft + transformedNav.clientWidth + transformedNavTransformPix;
        // Caculate the nav container element position right
        const navContainerOffsetRight = navContainer.clientLeft + navContainer.clientWidth - _padding * 2;
        expect(lastTabOffsetRight).toBe(navContainerOffsetRight);
      });
      it('should has no padding bottom at the last tab in vertical', () => {
        appComponent.tabPositionMode = 'vertical';
        fixture.detectChanges();
        const _padding = 100;
        // Add Enough Tab
        const nav = fixture.debugElement.query(By.directive(NzTabsNavComponent));
        appComponent.addTabsForScrolling();
        fixture.detectChanges();
        // Mock add vertical related class
        (nav.nativeElement as HTMLElement).classList.add('ant-tabs-left-bar');
        fixture.detectChanges();
        // Modify nav container padding top and padding bottom
        const navContainer = fixture.debugElement.query(By.css('.ant-tabs-nav-container')).nativeElement as HTMLElement;
        // The transition must be set to none, or the calculate of getComputedStyle() will equal to 0
        navContainer.style.transition = 'none';
        navContainer.style.paddingTop = `${_padding}px`;
        navContainer.style.paddingBottom = `${_padding}px`;
        // Focus on the last tab, expect the last tab offset bottom to be the nav container offset bottom.
        appComponent.nzTabsNavComponent.selectedIndex = appComponent.tabs.length - 1;
        fixture.detectChanges();
        // Caculate the scrolling element position bottom
        // Format: translate3d(0px, xxxpx, 0px)
        const transformedNav: HTMLElement = nav.nativeElement.querySelector('.ant-tabs-nav');
        const transformedNavStyle = transformedNav.style.transform + '';
        const transformedNavTransformPix = parseInt(transformedNavStyle.split(',')[1].slice(0, -2), 10);
        const lastTabOffsetBottom = transformedNav.clientTop + transformedNav.clientHeight + transformedNavTransformPix;
        // Caculate the nav container element position bottom
        const navContainerOffsetBottom = navContainer.clientTop + navContainer.clientHeight - _padding * 2;
        expect(lastTabOffsetBottom).toBe(navContainerOffsetBottom);
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

      it('should scroll to show the focused tab label in rtl direction', () => {
        appComponent.addTabsForScrolling();
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance).toBe(0);

        // Focus on the last tab, expect this to be the maximum scroll distance.
        appComponent.nzTabsNavComponent.selectedIndex = appComponent.tabs.length - 1;
        fixture.detectChanges();
        expect(appComponent.nzTabsNavComponent.scrollDistance).toBe(
          appComponent.nzTabsNavComponent.getMaxScrollDistance()
        );

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
  template: `
    <div [dir]="dir" style="width: 300px; height: 300px;" class="ant-tabs">
      <div
        nz-tabs-nav
        role="tablist"
        tabindex="0"
        [selectedIndex]="selectedIndex"
        [nzPositionMode]="tabPositionMode"
        (nzOnNextClick)="onNextClick()"
        (nzOnPrevClick)="onPrevClick()"
      >
        <div *ngFor="let tab of tabs" nz-tab-label role="tab">
          {{ tab.label }}
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../style/index.less', './style/index.less']
})
class NzTestTabNavComponent {
  selectedIndex: number = 0;
  tabs = [{ label: 'tab one' }, { label: 'tab one' }, { label: 'tab one' }, { label: 'tab one' }];
  dir: Direction = 'ltr';
  tabPositionMode: NzTabPositionMode = 'horizontal';
  onNextClick = jasmine.createSpy('next click change');
  onPrevClick = jasmine.createSpy('pre click change');

  @ViewChild(NzTabsNavComponent, { static: true }) nzTabsNavComponent: NzTabsNavComponent;

  addTabsForScrolling(): void {
    this.tabs.push({ label: 'new' }, { label: 'new' }, { label: 'new' }, { label: 'new' });
  }
}
