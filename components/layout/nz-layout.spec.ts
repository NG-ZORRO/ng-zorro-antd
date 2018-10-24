import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick , TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzMatchMediaService } from '../core/services/nz-match-media.service';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzDemoLayoutBasicComponent } from './demo/basic';
import { NzDemoLayoutCustomTriggerComponent } from './demo/custom-trigger';
import { NzDemoLayoutResponsiveComponent } from './demo/responsive';
import { NzDemoLayoutSideComponent } from './demo/side';
import { NzContentComponent } from './nz-content.component';
import { NzFooterComponent } from './nz-footer.component';
import { NzHeaderComponent } from './nz-header.component';
import { NzLayoutComponent } from './nz-layout.component';
import { NzLayoutModule } from './nz-layout.module';
import { NzSiderComponent } from './nz-sider.component';

describe('layout', () => {
  let testComponent;
  let fixture;
  describe('basic', () => {
    let headers;
    let contents;
    let footers;
    let siders;
    let layouts;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzLayoutModule ],
        declarations: [ NzDemoLayoutBasicComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoLayoutBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      headers = fixture.debugElement.queryAll(By.directive(NzHeaderComponent));
      contents = fixture.debugElement.queryAll(By.directive(NzContentComponent));
      footers = fixture.debugElement.queryAll(By.directive(NzFooterComponent));
      siders = fixture.debugElement.queryAll(By.directive(NzSiderComponent));
      layouts = fixture.debugElement.queryAll(By.directive(NzLayoutComponent));
    });

    it('should have correct class', () => {
      fixture.detectChanges();
      expect(headers.every(header => header.nativeElement.classList.contains('ant-layout-header'))).toBe(true);
      expect(layouts.every(layout => layout.nativeElement.classList.contains('ant-layout'))).toBe(true);
      expect(contents.every(content => content.nativeElement.classList.contains('ant-layout-content'))).toBe(true);
      expect(footers.every(footer => footer.nativeElement.classList.contains('ant-layout-footer'))).toBe(true);
      expect(siders.every(sider => sider.nativeElement.classList.contains('ant-layout-sider'))).toBe(true);
      expect(siders.every(sider => sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;')).toBe(true);
      expect(layouts[ 2 ].nativeElement.classList.contains('ant-layout-has-sider')).toBe(true);
      expect(layouts[ 4 ].nativeElement.classList.contains('ant-layout-has-sider')).toBe(true);
      expect(layouts[ 5 ].nativeElement.classList.contains('ant-layout-has-sider')).toBe(true);
    });
  });
  describe('side', () => {
    let sider;
    let trigger;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzLayoutModule ],
        declarations: [ NzDemoLayoutSideComponent ],
        providers   : [],
        schemas     : [ NO_ERRORS_SCHEMA ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoLayoutSideComponent);
      testComponent = fixture.debugElement.componentInstance;
      sider = fixture.debugElement.query(By.directive(NzSiderComponent));
    });

    it('should nzCollapsed work', () => {
      testComponent.isCollapsed = false;
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;').toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
      trigger.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(true);
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;').toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      trigger.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(false);
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;').toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
      testComponent.isCollapsed = true;
      fixture.detectChanges();
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;').toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      testComponent.isCollapsed = false;
      fixture.detectChanges();
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;').toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
    });
    it('should nzWidth work', () => {
      testComponent.isCollapsed = false;
      testComponent.width = 300;
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;').toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
      trigger.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(true);
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;').toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      trigger.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(false);
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;').toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
      testComponent.isCollapsed = true;
      fixture.detectChanges();
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;').toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      testComponent.isCollapsed = false;
      fixture.detectChanges();
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;').toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
    });

    it('should nzReverseArrow work', () => {
      testComponent.isCollapsed = false;
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(trigger.nativeElement.firstElementChild.classList.contains('anticon-left')).toBe(true);
      testComponent.isCollapsed = true;
      fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild.classList.contains('anticon-right')).toBe(true);
      testComponent.isReverseArrow = true;
      testComponent.isCollapsed = false;
      fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild.classList.contains('anticon-right')).toBe(true);
      testComponent.isCollapsed = true;
      fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild.classList.contains('anticon-left')).toBe(true);

    });
  });
  describe('custom-trigger', () => {
    let sider;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzLayoutModule, NzIconModule ],
        declarations: [ NzDemoLayoutCustomTriggerComponent ],
        providers   : [],
        schemas     : [ NO_ERRORS_SCHEMA ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoLayoutCustomTriggerComponent);
      testComponent = fixture.debugElement.componentInstance;
      sider = fixture.debugElement.query(By.directive(NzSiderComponent)).injector.get(NzSiderComponent);
    });
    it('should not display trigger', () => {
      fixture.detectChanges();
      const trigger = fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(trigger).toBeNull();
    });
    it('should display trigger', () => {
      testComponent.changeTrigger();
      fixture.detectChanges();
      const trigger = fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(trigger.nativeElement.firstElementChild.classList.contains('anticon-up')).toBe(true);
      expect(trigger).not.toBeNull();
    });
  });
  describe('responsive', () => {
    let sider;

    class MatchMediaServiceSpy {
      matchMedia = jasmine.createSpy('matchMedia').and.returnValue({
        matches: true
      });
    }

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzLayoutModule ],
        declarations: [ NzDemoLayoutResponsiveComponent ],
        schemas     : [ NO_ERRORS_SCHEMA ]
      }).overrideComponent(NzSiderComponent, {
        set: {
          providers: [
            { provide: NzMatchMediaService, useClass: MatchMediaServiceSpy }
          ]
        }
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoLayoutResponsiveComponent);
      testComponent = fixture.debugElement.componentInstance;
      sider = fixture.debugElement.query(By.directive(NzSiderComponent));
    });
    it('should responsive work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;').toBe(true);
    }));
  });
});
