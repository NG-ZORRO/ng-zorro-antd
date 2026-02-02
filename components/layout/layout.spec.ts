/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement, provideZoneChangeDetection, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzContentComponent } from './content.component';
import { NzFooterComponent } from './footer.component';
import { NzHeaderComponent } from './header.component';
import { NzLayoutComponent } from './layout.component';
import { NzLayoutModule } from './layout.module';
import { NzSiderComponent } from './sider.component';

declare const viewport: NzSafeAny;

describe('nz-layout', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<NzLayoutBasicComponent>;
    let headers: DebugElement[];
    let contents: DebugElement[];
    let footers: DebugElement[];
    let siders: DebugElement[];
    let layouts: DebugElement[];

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

    beforeEach(() => {
      // todo: use zoneless
      TestBed.configureTestingModule({
        providers: [provideZoneChangeDetection()]
      });
      fixture = TestBed.createComponent(NzLayoutSideComponent);
      testComponent = fixture.componentInstance;
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

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNzIconsTesting()]
      });
      fixture = TestBed.createComponent(NzLayoutCustomTriggerComponent);
      testComponent = fixture.componentInstance;
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

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNzIconsTesting()]
      });
      fixture = TestBed.createComponent(NzLayoutResponsiveComponent);
      sider = fixture.debugElement.query(By.directive(NzSiderComponent));
    });

    it('should responsive work', fakeAsync(() => {
      viewport.set(500);
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      discardPeriodicTasks();
      fixture.detectChanges();
      expect(sider.nativeElement.style.cssText).toBe('flex: 0 0 0px; max-width: 0px; min-width: 0px; width: 0px;');
      expect(
        sider.nativeElement
          .querySelector('.ant-layout-sider-zero-width-trigger')
          .firstElementChild.getAttribute('nzType')
      ).toBe('menu-fold');
      viewport.reset();
    }));
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<NzTestLayoutRtlComponent>;
    let layouts: DebugElement[];

    beforeEach(() => {
      // todo: use zoneless
      TestBed.configureTestingModule({
        providers: [provideZoneChangeDetection()]
      });
      fixture = TestBed.createComponent(NzTestLayoutRtlComponent);
      layouts = fixture.debugElement.queryAll(By.directive(NzLayoutComponent));
    });

    it('should className correct on dir change', fakeAsync(() => {
      fixture.detectChanges();
      expect(layouts.every(layout => layout.nativeElement.classList.contains('ant-layout-rtl'))).toBe(true);

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();

      expect(layouts.every(layout => layout.nativeElement.classList.contains('ant-layout-rtl'))).toBe(false);
    }));
  });
});

@Component({
  imports: [NzIconModule, NzLayoutModule],
  template: `
    <nz-layout>
      <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed" [nzTrigger]="triggerTemplate" />
      <nz-layout>
        <nz-header>
          <span
            class="trigger"
            nz-icon
            [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"
            (click)="isCollapsed = !isCollapsed"
          ></span>
        </nz-header>
        <nz-content>
          <div>Bill is a cat.</div>
        </nz-content>
        <nz-footer>Ant Design ©2019 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
    <ng-template #trigger>
      <nz-icon nzType="up" />
    </ng-template>
  `
})
export class NzLayoutCustomTriggerComponent {
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger', { static: true }) customTrigger!: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}

@Component({
  imports: [NzLayoutModule],
  template: `
    <nz-layout>
      <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed" [nzWidth]="width" [nzReverseArrow]="isReverseArrow" />
      <nz-layout>
        <nz-header />
        <nz-content>
          <div>Bill is a cat.</div>
        </nz-content>
        <nz-footer>Ant Design ©2019 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
  `
})
export class NzLayoutSideComponent {
  isCollapsed = false;
  isReverseArrow = false;
  width: string | number = '200px';
}

@Component({
  imports: [NzIconModule, NzLayoutModule],
  template: `
    <nz-layout>
      <nz-sider
        nzCollapsible
        [(nzCollapsed)]="isCollapsed"
        nzBreakpoint="lg"
        [nzCollapsedWidth]="0"
        [nzZeroTrigger]="zeroTrigger"
      />
      <nz-layout>
        <nz-header />
        <nz-content>
          <div>Content</div>
        </nz-content>
        <nz-footer>Ant Design ©2019 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
    <ng-template #zeroTrigger>
      <nz-icon nzType="menu-fold" nzTheme="outline" />
    </ng-template>
  `
})
export class NzLayoutResponsiveComponent {
  isCollapsed = false;
}

@Component({
  imports: [NzLayoutModule],
  selector: 'nz-test-layout-basic',
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

@Component({
  imports: [BidiModule, NzLayoutBasicComponent],
  template: `
    <div [dir]="direction">
      <nz-test-layout-basic />
    </div>
  `
})
export class NzTestLayoutRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}
