import { MediaMatcher } from '@angular/cdk/layout';
import { Component, DebugElement, NO_ERRORS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { async, discardPeriodicTasks, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzContentComponent } from './nz-content.component';
import { NzFooterComponent } from './nz-footer.component';
import { NzHeaderComponent } from './nz-header.component';
import { NzLayoutComponent } from './nz-layout.component';
import { NzLayoutModule } from './nz-layout.module';
import { NzSiderComponent } from './nz-sider.component';

describe('layout', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<NzLayoutBasicComponent>;
    let headers: DebugElement[];
    let contents: DebugElement[];
    let footers: DebugElement[];
    let siders: DebugElement[];
    let layouts: DebugElement[];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzLayoutModule],
        declarations: [NzLayoutBasicComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzLayoutBasicComponent);
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
      expect(
        siders.every(
          sider =>
            sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
        )
      ).toBe(true);
      expect(layouts[2].nativeElement.classList.contains('ant-layout-has-sider')).toBe(true);
      expect(layouts[4].nativeElement.classList.contains('ant-layout-has-sider')).toBe(true);
      expect(layouts[5].nativeElement.classList.contains('ant-layout-has-sider')).toBe(true);
    });
  });
  describe('side', () => {
    let fixture: ComponentFixture<NzLayoutSideComponent>;
    let testComponent: NzLayoutSideComponent;
    let sider: DebugElement;
    let trigger: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzLayoutModule],
        declarations: [NzLayoutSideComponent],
        providers: [],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzLayoutSideComponent);
      testComponent = fixture.debugElement.componentInstance;
      sider = fixture.debugElement.query(By.directive(NzSiderComponent));
    });

    it('should nzCollapsed work', () => {
      testComponent.isCollapsed = false;
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
      trigger.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(true);
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      trigger.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(false);
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
      testComponent.isCollapsed = true;
      fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      testComponent.isCollapsed = false;
      fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
    });
    it('should nzWidth work', () => {
      testComponent.isCollapsed = false;
      testComponent.width = 300;
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
      trigger.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(true);
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      trigger.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(false);
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
      testComponent.isCollapsed = true;
      fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      testComponent.isCollapsed = false;
      fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
    });

    it('should nzReverseArrow work', () => {
      testComponent.isCollapsed = false;
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(trigger.nativeElement.firstElementChild!.classList.contains('anticon-left')).toBe(true);
      testComponent.isCollapsed = true;
      fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild!.classList.contains('anticon-right')).toBe(true);
      testComponent.isReverseArrow = true;
      testComponent.isCollapsed = false;
      fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild!.classList.contains('anticon-right')).toBe(true);
      testComponent.isCollapsed = true;
      fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild!.classList.contains('anticon-left')).toBe(true);
    });
  });
  describe('custom-trigger', () => {
    let fixture: ComponentFixture<NzLayoutCustomTriggerComponent>;
    let testComponent: NzLayoutCustomTriggerComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzLayoutModule, NzIconTestModule],
        declarations: [NzLayoutCustomTriggerComponent],
        providers: [],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzLayoutCustomTriggerComponent);
      testComponent = fixture.debugElement.componentInstance;
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
      expect(trigger.nativeElement.firstElementChild!.classList.contains('anticon-up')).toBe(true);
      expect(trigger).not.toBeNull();
    });
  });
  describe('responsive', () => {
    let fixture: ComponentFixture<NzLayoutResponsiveComponent>;
    let sider: DebugElement;

    class MatchMediaServiceSpy {
      matchMedia = jasmine.createSpy('matchMedia').and.returnValue({
        matches: true
      });
    }

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzLayoutModule],
        declarations: [NzLayoutResponsiveComponent],
        schemas: [NO_ERRORS_SCHEMA]
      })
        .overrideComponent(NzSiderComponent, {
          set: {
            providers: [{ provide: MediaMatcher, useClass: MatchMediaServiceSpy }]
          }
        })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzLayoutResponsiveComponent);
      sider = fixture.debugElement.query(By.directive(NzSiderComponent));
    });

    it('should responsive work', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      discardPeriodicTasks();
      fixture.detectChanges();
      console.log(sider.nativeElement.style.cssText);
      expect(sider.nativeElement.style.cssText === 'flex: 0 0 0px; max-width: 0px; min-width: 0px; width: 0px;').toBe(
        true
      );
      expect(
        sider.nativeElement
          .querySelector('.ant-layout-sider-zero-width-trigger')
          .firstElementChild.getAttribute('nzType')
      ).toBe('menu-fold');
    }));
  });
});

@Component({
  template: `
    <nz-layout>
      <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed" [nzTrigger]="triggerTemplate">
        <div class="logo"></div>
        <ul nz-menu [nzTheme]="'dark'" [nzMode]="'inline'" [nzInlineCollapsed]="isCollapsed">
          <li nz-submenu>
            <span title><i nz-icon nzType="user"></i><span class="nav-text">User</span></span>
            <ul>
              <li nz-menu-item>Tom</li>
              <li nz-menu-item>Bill</li>
              <li nz-menu-item>Alex</li>
            </ul>
          </li>
          <li nz-submenu>
            <span title><i nz-icon nzType="team"></i><span class="nav-text">Team</span></span>
            <ul>
              <li nz-menu-item>Team 1</li>
              <li nz-menu-item>Team 2</li>
            </ul>
          </li>
          <li nz-menu-item>
            <span><i nz-icon nzType="file"></i><span class="nav-text">File</span></span>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header style="background: #fff; padding:0;">
          <i
            class="trigger"
            nz-icon
            [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"
            (click)="isCollapsed = !isCollapsed"
          ></i>
        </nz-header>
        <nz-content style="margin:0 16px;">
          <nz-breadcrumb style="margin:16px 0;">
            <nz-breadcrumb-item>User</nz-breadcrumb-item>
            <nz-breadcrumb-item>Bill</nz-breadcrumb-item>
          </nz-breadcrumb>
          <div style="padding:24px; background: #fff; min-height: 360px;">
            Bill is a cat.
          </div>
        </nz-content>
        <nz-footer style="text-align: center;">Ant Design ©2019 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
    <ng-template #trigger>
      <i nz-icon nzType="up"></i>
    </ng-template>
  `
})
export class NzLayoutCustomTriggerComponent {
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger', { static: true }) customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}

@Component({
  template: `
    <nz-layout>
      <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed" [nzWidth]="width" [nzReverseArrow]="isReverseArrow">
        <div class="logo"></div>
        <ul nz-menu [nzTheme]="'dark'" [nzMode]="'inline'" [nzInlineCollapsed]="isCollapsed">
          <li nz-submenu>
            <span title><i nz-icon nzType="user"></i><span class="nav-text">User</span></span>
            <ul>
              <li nz-menu-item>Tom</li>
              <li nz-menu-item>Bill</li>
              <li nz-menu-item>Alex</li>
            </ul>
          </li>
          <li nz-submenu>
            <span title><i nz-icon nzType="team"></i><span class="nav-text">Team</span></span>
            <ul>
              <li nz-menu-item>Team 1</li>
              <li nz-menu-item>Team 2</li>
            </ul>
          </li>
          <li nz-menu-item>
            <span><i nz-icon nzType="file"></i><span class="nav-text">File</span></span>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header style="background: #fff; padding:0;"></nz-header>
        <nz-content style="margin:0 16px;">
          <nz-breadcrumb style="margin:16px 0;">
            <nz-breadcrumb-item>User</nz-breadcrumb-item>
            <nz-breadcrumb-item>Bill</nz-breadcrumb-item>
          </nz-breadcrumb>
          <div style="padding:24px; background: #fff; min-height: 360px;">
            Bill is a cat.
          </div>
        </nz-content>
        <nz-footer style="text-align: center;">Ant Design ©2019 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
  `,
  styles: [
    `
      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }
    `
  ]
})
export class NzLayoutSideComponent {
  isCollapsed = false;
  isReverseArrow = false;
  width: string | number = '200px';
}

@Component({
  template: `
    <nz-layout>
      <nz-sider
        nzCollapsible
        [(nzCollapsed)]="isCollapsed"
        [nzBreakpoint]="'lg'"
        [nzCollapsedWidth]="0"
        [nzZeroTrigger]="zeroTrigger"
      >
        <div class="logo"></div>
        <ul nz-menu [nzTheme]="'dark'" [nzMode]="'inline'" [nzInlineCollapsed]="isCollapsed">
          <li nz-menu-item>
            <span><i nz-icon nzType="user"></i><span class="nav-text">nav 1</span></span>
          </li>
          <li nz-menu-item>
            <span><i nz-icon nzType="video-camera"></i><span class="nav-text">nav 2</span></span>
          </li>
          <li nz-menu-item>
            <span><i nz-icon nzType="upload"></i><span class="nav-text">nav 3</span></span>
          </li>
          <li nz-menu-item>
            <span><i nz-icon nzType="user"></i><span class="nav-text">nav 4</span></span>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header style="background: #fff; padding:0;"></nz-header>
        <nz-content style="margin:24px 16px 0;">
          <div style="padding:24px; background: #fff; min-height: 360px;">
            Content
          </div>
        </nz-content>
        <nz-footer style="text-align: center;">Ant Design ©2019 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
    <ng-template #zeroTrigger>
      <i nz-icon nzType="menu-fold" nzTheme="outline"></i>
    </ng-template>
  `
})
export class NzLayoutResponsiveComponent {
  isCollapsed = false;
}

@Component({
  template: `
    <nz-layout>
      <nz-header>Header</nz-header>
      <nz-content>Content</nz-content>
      <nz-footer>Footer</nz-footer>
    </nz-layout>

    <nz-layout>
      <nz-header>Header</nz-header>
      <nz-layout>
        <nz-sider>Sider</nz-sider>
        <nz-content>Content</nz-content>
      </nz-layout>
      <nz-footer>Footer</nz-footer>
    </nz-layout>

    <nz-layout>
      <nz-header>Header</nz-header>
      <nz-layout>
        <nz-content>Content</nz-content>
        <nz-sider>Sider</nz-sider>
      </nz-layout>
      <nz-footer>Footer</nz-footer>
    </nz-layout>

    <nz-layout>
      <nz-sider>Sider</nz-sider>
      <nz-layout>
        <nz-header>Header</nz-header>
        <nz-content>Content</nz-content>
        <nz-footer>Footer</nz-footer>
      </nz-layout>
    </nz-layout>
  `
})
export class NzLayoutBasicComponent {}
