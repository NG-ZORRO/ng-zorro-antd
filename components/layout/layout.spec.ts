import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzContentComponent } from './content.component';
import { NzFooterComponent } from './footer.component';
import { NzHeaderComponent } from './header.component';
import { NzLayoutComponent } from './layout.component';
import { NzLayoutModule } from './layout.module';
import { NzSiderComponent } from './sider.component';

declare const viewport: NzSafeAny;

describe('layout', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzLayoutBasicComponent>;
    let headers: DebugElement[];
    let contents: DebugElement[];
    let footers: DebugElement[];
    let siders: DebugElement[];
    let layouts: DebugElement[];

    beforeEach(
      waitForAsync(() => {
        testBed = createComponentBed(NzLayoutBasicComponent, { imports: [NzLayoutModule] });
        headers = testBed.fixture.debugElement.queryAll(By.directive(NzHeaderComponent));
        contents = testBed.fixture.debugElement.queryAll(By.directive(NzContentComponent));
        footers = testBed.fixture.debugElement.queryAll(By.directive(NzFooterComponent));
        siders = testBed.fixture.debugElement.queryAll(By.directive(NzSiderComponent));
        layouts = testBed.fixture.debugElement.queryAll(By.directive(NzLayoutComponent));
      })
    );

    it('should have correct class', () => {
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
    let testBed: ComponentBed<NzLayoutSideComponent>;
    let testComponent: NzLayoutSideComponent;
    let sider: DebugElement;
    let trigger: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzLayoutSideComponent, { imports: [NzLayoutModule] });
      testComponent = testBed.component;
      sider = testBed.fixture.debugElement.query(By.directive(NzSiderComponent));
    });

    it('should nzCollapsed work', () => {
      testComponent.isCollapsed = false;
      testBed.fixture.detectChanges();
      trigger = testBed.fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
      trigger.nativeElement.click();
      testBed.fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(true);
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      trigger.nativeElement.click();
      testBed.fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(false);
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
      testComponent.isCollapsed = true;
      testBed.fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      testComponent.isCollapsed = false;
      testBed.fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 200px;').toBe(true);
    });
    it('should nzWidth work', () => {
      testComponent.isCollapsed = false;
      testComponent.width = 300;
      testBed.fixture.detectChanges();
      trigger = testBed.fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
      trigger.nativeElement.click();
      testBed.fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(true);
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      trigger.nativeElement.click();
      testBed.fixture.detectChanges();
      expect(testComponent.isCollapsed).toBe(false);
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
      testComponent.isCollapsed = true;
      testBed.fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 80px; max-width: 80px; min-width: 80px; width: 80px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 80px;').toBe(true);
      testComponent.isCollapsed = false;
      testBed.fixture.detectChanges();
      expect(
        sider.nativeElement.style.cssText === 'flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px;'
      ).toBe(true);
      expect(trigger.nativeElement.style.cssText === 'width: 300px;').toBe(true);
    });

    it('should nzReverseArrow work', () => {
      testComponent.isCollapsed = false;
      testBed.fixture.detectChanges();
      trigger = testBed.fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(trigger.nativeElement.firstElementChild!.classList.contains('anticon-left')).toBe(true);
      testComponent.isCollapsed = true;
      testBed.fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild!.classList.contains('anticon-right')).toBe(true);
      testComponent.isReverseArrow = true;
      testComponent.isCollapsed = false;
      testBed.fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild!.classList.contains('anticon-right')).toBe(true);
      testComponent.isCollapsed = true;
      testBed.fixture.detectChanges();
      expect(trigger.nativeElement.firstElementChild!.classList.contains('anticon-left')).toBe(true);
    });
  });
  describe('custom-trigger', () => {
    let testBed: ComponentBed<NzLayoutCustomTriggerComponent>;
    let testComponent: NzLayoutCustomTriggerComponent;

    beforeEach(() => {
      testBed = createComponentBed(NzLayoutCustomTriggerComponent, { imports: [NzLayoutModule, NzIconTestModule] });
      testComponent = testBed.component;
    });
    it('should not display trigger', () => {
      testBed.fixture.detectChanges();
      const trigger = testBed.fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(trigger).toBeNull();
    });
    it('should display trigger', () => {
      testComponent.changeTrigger();
      testBed.fixture.detectChanges();
      const trigger = testBed.fixture.debugElement.query(By.css('.ant-layout-sider-trigger'));
      expect(trigger.nativeElement.firstElementChild!.classList.contains('anticon-up')).toBe(true);
      expect(trigger).not.toBeNull();
    });
  });
  describe('responsive', () => {
    let testBed: ComponentBed<NzLayoutResponsiveComponent>;
    let sider: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzLayoutResponsiveComponent, { imports: [NzLayoutModule] });
      sider = testBed.fixture.debugElement.query(By.directive(NzSiderComponent));
    });

    it('should responsive work', fakeAsync(() => {
      viewport.set(500);
      window.dispatchEvent(new Event('resize'));
      testBed.fixture.detectChanges();
      tick(1000);
      testBed.fixture.detectChanges();
      discardPeriodicTasks();
      testBed.fixture.detectChanges();
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
    let testBed: ComponentBed<NzTestLayoutRtlComponent>;
    let layouts: DebugElement[];

    beforeEach(() => {
      testBed = createComponentBed(NzTestLayoutRtlComponent, {
        imports: [BidiModule, NzLayoutModule],
        declarations: [NzLayoutBasicComponent]
      });
      layouts = testBed.fixture.debugElement.queryAll(By.directive(NzLayoutComponent));
    });

    it('should className correct on dir change', fakeAsync(() => {
      testBed.fixture.detectChanges();
      expect(layouts.every(layout => layout.nativeElement.classList.contains('ant-layout-rtl'))).toBe(true);

      testBed.fixture.componentInstance.direction = 'ltr';
      testBed.fixture.detectChanges();

      expect(layouts.every(layout => layout.nativeElement.classList.contains('ant-layout-rtl'))).toBe(false);
    }));
  });
});

@Component({
  template: `
    <nz-layout>
      <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed" [nzTrigger]="triggerTemplate"></nz-sider>
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
      <span nz-icon nzType="up"></span>
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
  template: `
    <nz-layout>
      <nz-sider
        nzCollapsible
        [(nzCollapsed)]="isCollapsed"
        [nzWidth]="width"
        [nzReverseArrow]="isReverseArrow"
      ></nz-sider>
      <nz-layout>
        <nz-header></nz-header>
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
  template: `
    <nz-layout>
      <nz-sider
        nzCollapsible
        [(nzCollapsed)]="isCollapsed"
        [nzBreakpoint]="'lg'"
        [nzCollapsedWidth]="0"
        [nzZeroTrigger]="zeroTrigger"
      ></nz-sider>
      <nz-layout>
        <nz-header></nz-header>
        <nz-content>
          <div>Content</div>
        </nz-content>
        <nz-footer>Ant Design ©2019 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
    <ng-template #zeroTrigger>
      <span nz-icon nzType="menu-fold" nzTheme="outline"></span>
    </ng-template>
  `
})
export class NzLayoutResponsiveComponent {
  isCollapsed = false;
}

@Component({
  // eslint-disable-next-line
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
  template: `
    <div [dir]="direction">
      <nz-test-layout-basic></nz-test-layout-basic>
    </div>
  `
})
export class NzTestLayoutRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
