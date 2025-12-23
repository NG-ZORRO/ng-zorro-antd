/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AsyncPipe } from '@angular/common';
import {
  Component,
  DebugElement,
  OnInit,
  provideZoneChangeDetection,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink, RouterOutlet, Routes } from '@angular/router';
import { Observable } from 'rxjs';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ng-zorro-antd/core/testing';
import { NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzTabPosition, NzTabType } from 'ng-zorro-antd/tabs/interfaces';
import { NzTabNavBarComponent } from 'ng-zorro-antd/tabs/tab-nav-bar.component';

import { NzTabNavOperationComponent } from './tab-nav-operation.component';
import { NzTabComponent } from './tab.component';
import { NzTabsComponent } from './tabs.component';
import { NzTabsModule } from './tabs.module';

describe('tabs', () => {
  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation(), provideNzIconsTesting(), provideZoneChangeDetection()]
    });
  });

  describe('basic', () => {
    let fixture: ComponentFixture<SimpleTabsTestComponent>;
    let element: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTabsTestComponent);
      element = fixture.nativeElement;
    });

    it('should default to the first tab', () => {
      checkSelectedIndex(1, fixture);
    });

    it('should load content on first change detection pass', () => {
      fixture.detectChanges();
      expect(element.querySelectorAll('.ant-tabs-tabpane')[0]!.textContent).toContain(`Content of Tab Pane 1`);
    });

    it('should change selected index on click', () => {
      const component = fixture.debugElement.componentInstance;
      component.selectedIndex = 0;
      checkSelectedIndex(0, fixture);

      // select the second tab
      let tabLabel = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[1];
      tabLabel.nativeElement.click();
      checkSelectedIndex(1, fixture);

      // select the third tab
      tabLabel = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[2];
      tabLabel.nativeElement.click();
      checkSelectedIndex(2, fixture);
    });

    it('should support two-way binding for selectedIndex', fakeAsync(() => {
      const component = fixture.componentInstance;
      component.selectedIndex = 0;

      fixture.detectChanges();

      const tabLabel = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[1];
      tabLabel.nativeElement.click();
      fixture.detectChanges();
      flush();

      expect(component.selectedIndex).toBe(1);
    }));

    it('should update tab positions when selected index is changed', () => {
      fixture.detectChanges();
      const component: NzTabsComponent = fixture.debugElement.query(By.css('nz-tabs'))!.componentInstance;
      const tabs: NzTabComponent[] = component.tabs.toArray();

      expect(tabs[0].position).toBeLessThan(0);
      expect(tabs[1].position).toBe(0);
      expect(tabs[2].position).toBeGreaterThan(0);

      // Move to third tab
      component.nzSelectedIndex = 2;
      fixture.detectChanges();
      expect(tabs[0].position).toBeLessThan(0);
      expect(tabs[1].position).toBeLessThan(0);
      expect(tabs[2].position).toBe(0);

      // Move to the first tab
      component.nzSelectedIndex = 0;
      fixture.detectChanges();
      expect(tabs[0].position).toBe(0);
      expect(tabs[1].position).toBeGreaterThan(0);
      expect(tabs[2].position).toBeGreaterThan(0);
    });

    it('should clamp the selected index to the size of the number of tabs', () => {
      fixture.detectChanges();
      const component: NzTabsComponent = fixture.debugElement.query(By.css('nz-tabs'))!.componentInstance;

      // Set the index to be negative, expect the first tab selected
      fixture.componentInstance.selectedIndex = -1;
      fixture.detectChanges();
      expect(component.nzSelectedIndex).toBe(0);

      // Set the index beyond the size of the tabs, expect the last tab selected
      fixture.componentInstance.selectedIndex = 3;
      fixture.detectChanges();
      expect(component.nzSelectedIndex).toBe(2);
    });

    it('should not crash when setting the selected index to NaN', () => {
      const component = fixture.debugElement.componentInstance;

      expect(() => {
        component.selectedIndex = NaN;
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should emit nzSelectedIndexChange event on click', fakeAsync(() => {
      const component = fixture.componentInstance;
      component.selectedIndex = 0;
      spyOn(component, 'handleSelection');

      fixture.detectChanges();

      const tabLabel = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[1];

      expect(component.handleSelection).toHaveBeenCalledTimes(0);

      tabLabel.nativeElement.click();
      fixture.detectChanges();
      flush();

      expect(component.handleSelection).toHaveBeenCalledTimes(1);
      expect(component.selectedIndex).toBe(1);
    }));

    it('should emit nzSelectedIndexChange on arrow key navigation', fakeAsync(() => {
      const component = fixture.componentInstance;
      component.selectedIndex = 0;
      spyOn(component, 'handleSelection');
      fixture.detectChanges();

      const tab = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[1]!;
      const tabsContainer = fixture.debugElement.query(By.css('.ant-tabs-nav-wrap'))!.nativeElement as HTMLElement;
      const trigger = tab!.nativeElement as HTMLElement;

      expect(component.handleSelection).toHaveBeenCalledTimes(0);

      tab.nativeElement.click();
      fixture.detectChanges();
      flush();

      expect(component.handleSelection).toHaveBeenCalledTimes(1);

      dispatchKeyboardEvent(tabsContainer, 'keydown', LEFT_ARROW, trigger);
      fixture.detectChanges();
      dispatchKeyboardEvent(tabsContainer, 'keydown', ENTER, trigger);
      fixture.detectChanges();
      flush();

      expect(component.handleSelection).toHaveBeenCalledTimes(2);
      expect(component.handleSelection).toHaveBeenCalledWith(0);

      dispatchKeyboardEvent(tabsContainer, 'keydown', RIGHT_ARROW, trigger);
      fixture.detectChanges();
      dispatchKeyboardEvent(tabsContainer, 'keydown', SPACE, trigger);
      fixture.detectChanges();
      flush();

      expect(component.handleSelection).toHaveBeenCalledTimes(3);
      expect(component.handleSelection).toHaveBeenCalledWith(1);
    }));

    it('should not emit nzSelectedIndexChange when key-event on navigation list outside', fakeAsync(() => {
      const component = fixture.componentInstance;
      component.selectedIndex = 0;
      spyOn(component, 'handleSelection');
      fixture.detectChanges();
      fixture.detectChanges();
      flush();

      const tabsContainer = fixture.debugElement.query(By.css('.ant-tabs-nav-wrap'))!.nativeElement as HTMLElement;
      const trigger = fixture.debugElement.query(By.css('.extra-input'))!.nativeElement as HTMLElement;

      expect(component.handleSelection).toHaveBeenCalledTimes(0);

      dispatchKeyboardEvent(tabsContainer, 'keydown', LEFT_ARROW, trigger);
      fixture.detectChanges();
      dispatchKeyboardEvent(tabsContainer, 'keydown', ENTER, trigger);
      fixture.detectChanges();
      flush();

      expect(component.handleSelection).toHaveBeenCalledTimes(0);
      tick(300);
      fixture.detectChanges();
    }));

    it('should clean up the tabs QueryList on destroy', () => {
      const component: NzTabsComponent = fixture.debugElement.query(By.css('nz-tabs'))!.componentInstance;
      const spy = jasmine.createSpy('complete spy');
      const subscription = component.tabs.changes.subscribe({ complete: spy });

      fixture.destroy();

      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    });

    it('should set the correct position', () => {
      const component = fixture.debugElement.componentInstance;
      const tabSetElement = fixture.debugElement.query(By.css('.ant-tabs'))!.nativeElement!;
      const tabSetContentElement = fixture.debugElement.query(By.css('.ant-tabs .ant-tabs-content'))!.nativeElement!;
      component.position = 'left';
      fixture.detectChanges();

      expect(tabSetElement.classList).toContain('ant-tabs-left');
      expect(tabSetContentElement.classList).toContain('ant-tabs-content-left');
    });

    it('should set the correct size', () => {
      const component = fixture.debugElement.componentInstance;
      const tabSetElement = fixture.debugElement.query(By.css('.ant-tabs'))!.nativeElement!;
      component.size = 'small';
      fixture.detectChanges();

      expect(tabSetElement.classList).toContain('ant-tabs-small');
    });

    it('should set the correct type', () => {
      const component = fixture.debugElement.componentInstance;
      const tabSetElement = fixture.debugElement.query(By.css('.ant-tabs'))!.nativeElement!;
      component.type = 'card';
      fixture.detectChanges();

      expect(tabSetElement.classList).toContain('ant-tabs-card');
      expect(tabSetElement.classList).not.toContain('ant-tabs-editable');
      expect(tabSetElement.classList).not.toContain('ant-tabs-editable-card');

      component.type = 'editable-card';
      fixture.detectChanges();

      expect(tabSetElement.classList).toContain('ant-tabs-card');
      expect(tabSetElement.classList).toContain('ant-tabs-editable');
      expect(tabSetElement.classList).toContain('ant-tabs-editable-card');
    });

    it('should set the correct tabBarGutter', () => {
      fixture.detectChanges();

      const component = fixture.debugElement.componentInstance;
      const tabsButtons = fixture.nativeElement.querySelectorAll('.ant-tabs-tab')! as HTMLElement[];
      component.tabBarGutter = 10;
      fixture.detectChanges();

      expect(tabsButtons.length).toBe(3);

      tabsButtons.forEach(tab => {
        expect(tab.style.marginRight).toBe('10px');
        expect(tab.style.marginBottom).toBe('');
      });

      component.position = 'left';
      fixture.detectChanges();

      tabsButtons.forEach(tab => {
        expect(tab.style.marginRight).toBe('');
        expect(tab.style.marginBottom).toBe('10px');
      });
    });

    it('should set the correct tabBarStyle', fakeAsync(() => {
      fixture.detectChanges();
      tick(200);

      const component = fixture.debugElement.componentInstance;
      const tabsNav = fixture.debugElement.query(By.css('nz-tabs-nav'))!.nativeElement;
      component.tabBarStyle = { color: 'rgb(255, 0, 0)' };

      fixture.detectChanges();
      tick(200);

      expect(tabsNav.style.color).toBe('rgb(255, 0, 0)');
    }));

    it('should set the correct centered', () => {
      const component = fixture.debugElement.componentInstance;
      const tabSet = fixture.debugElement.query(By.css('nz-tabs'))!.nativeElement;
      fixture.detectChanges();

      expect(tabSet.classList).not.toContain('ant-tabs-centered');

      component.centered = true;
      fixture.detectChanges();

      expect(tabSet.classList).toContain('ant-tabs-centered');
    });

    it('should canDeactivate work', () => {
      const component = fixture.debugElement.componentInstance;
      component.selectedIndex = 0;
      component.canDeactivate = (_: number, next: number) => next !== 2;

      fixture.detectChanges();

      let tabLabel = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[1];
      tabLabel.nativeElement.click();
      fixture.detectChanges();
      checkSelectedIndex(1, fixture);

      tabLabel = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[2];
      tabLabel.nativeElement.click();
      fixture.detectChanges();
      checkSelectedIndex(1, fixture);
    });

    it('should emit add event', () => {
      const component = fixture.debugElement.componentInstance;
      component.type = 'editable-card';
      spyOn(fixture.componentInstance, 'handleAdd');
      fixture.detectChanges();

      const addButton = fixture.debugElement.query(By.css('.ant-tabs-nav-add'))!.nativeElement;
      addButton.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.handleAdd).toHaveBeenCalledTimes(1);
    });

    it('should emit close event', () => {
      const component = fixture.debugElement.componentInstance;
      component.type = 'editable-card';
      component.closable = true;
      spyOn(fixture.componentInstance, 'handleClose');
      fixture.detectChanges();

      const addButton = fixture.debugElement.queryAll(By.css('.ant-tabs-tab-remove'))[1]!.nativeElement;
      addButton.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.handleClose).toHaveBeenCalledTimes(1);
      expect(fixture.componentInstance.handleClose).toHaveBeenCalledWith(jasmine.objectContaining({ index: 1 }));
    });
  });

  describe('template inputs support', () => {
    let fixture: ComponentFixture<TemplateTabsTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TemplateTabsTestComponent);
      fixture.detectChanges();
    });

    it('should set the correct title with template', () => {
      const tabElement = fixture.debugElement.query(By.css(`.ant-tabs-tab:nth-of-type(2)`))!.nativeElement;
      expect(tabElement.querySelector('.title')).not.toBeNull();
    });

    it('should set the correct content with template', () => {
      const tabElement: HTMLDivElement = fixture.debugElement.query(By.css(`.ant-tabs-tabpane-active`))!.nativeElement;
      expect(tabElement.textContent).toContain('Template Content of Tab Pane 1');
    });

    it('should set the correct close icons with template', () => {
      const tabCloseButtons = fixture.debugElement.queryAll(By.css(`.ant-tabs-tab .ant-tabs-tab-remove`));
      tabCloseButtons.forEach(e => {
        const tabCloseBtnElement = e.nativeElement!;
        expect(tabCloseBtnElement.querySelector('.close-icon')).not.toBeNull();
        expect(tabCloseBtnElement.querySelector('.close-icon')!.textContent).toBe('x');
      });
    });

    it('should set the correct add icons with template', () => {
      const tabAddButton = fixture.debugElement.query(By.css(`nz-tabs-nav .ant-tabs-nav-add`))!.nativeElement;
      expect(tabAddButton.querySelector('.add-icon')).not.toBeNull();
      expect(tabAddButton.querySelector('.add-icon')!.textContent).toBe('+');
    });
  });

  describe('disable', () => {
    let fixture: ComponentFixture<DisableTabsTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(DisableTabsTestComponent);
      fixture.detectChanges();
    });

    it('should have one disabled tab', () => {
      const tabs = fixture.debugElement.queryAll(By.css('.ant-tabs-tab-disabled'));
      expect(tabs.length).toBe(1);
    });

    it('should set the disabled flag on tab', () => {
      const tabs = fixture.componentInstance.tabs.toArray();
      let labels = fixture.debugElement.queryAll(By.css('.ant-tabs-tab-disabled'));
      expect(tabs[0].nzDisabled).toBe(false);
      expect(tabs[1].nzDisabled).toBe(false);
      expect(labels.length).toBe(1);

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      expect(tabs[1].nzDisabled).toBe(true);
      labels = fixture.debugElement.queryAll(By.css('.ant-tabs-tab-disabled'));
      expect(labels.length).toBe(2);
    });

    it('should not have a close button when disabled', () => {
      let closeButton = fixture.debugElement.query(By.css('.ant-tabs-tab-remove'));
      expect(closeButton).not.toBeNull();

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      closeButton = fixture.debugElement.query(By.css('.ant-tabs-tab-remove'));
      expect(closeButton).toBeNull();
    });

    it('should not change selected index on click when disabled', fakeAsync(() => {
      const component = fixture.debugElement.componentInstance;
      component.selectedIndex = 0;
      fixture.detectChanges();

      checkSelectedIndex(0, fixture);

      let tabLabel = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[2];
      tabLabel.nativeElement.click();
      fixture.detectChanges();
      flush();

      checkSelectedIndex(0, fixture);

      tabLabel = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[1];
      tabLabel.nativeElement.click();
      fixture.detectChanges();
      flush();

      checkSelectedIndex(1, fixture);

      component.disabled = true;
      component.selectedIndex = 0;
      fixture.detectChanges();
      flush();

      tabLabel = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[1];
      tabLabel.nativeElement.click();
      fixture.detectChanges();
      flush();

      checkSelectedIndex(0, fixture);
    }));
  });

  describe('dynamic tabs', () => {
    let fixture: ComponentFixture<DynamicTabsTestComponent>;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(DynamicTabsTestComponent);
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
    }));

    it('should be able to add a new tab, select it, and have correct origin position', fakeAsync(() => {
      const component: NzTabsComponent = fixture.debugElement.query(By.css('nz-tabs'))!.componentInstance;

      let tabs: NzTabComponent[] = component.tabs.toArray();
      expect(tabs[0].origin).toBe(null);
      expect(tabs[1].origin).toBe(0);
      expect(tabs[2].origin).toBe(null);

      // Add a new tab on the right and select it, expect an origin >= than 0 (animate right)
      fixture.componentInstance.tabs.push({ title: 'New tab', content: 'to right of index' });
      fixture.componentInstance.selectedIndex = 4;
      fixture.detectChanges();
      flush();

      tabs = component.tabs.toArray();
      expect(tabs[3].origin).toBeGreaterThanOrEqual(0);

      // Add a new tab in the beginning and select it, expect an origin < than 0 (animate left)
      fixture.componentInstance.selectedIndex = 0;
      fixture.detectChanges();
      flush();

      fixture.componentInstance.tabs.push({ title: 'New tab', content: 'to left of index' });
      fixture.detectChanges();
      flush();

      tabs = component.tabs.toArray();
      expect(tabs[0].origin).toBeLessThan(0);
    }));

    it('should update selected index if the last tab removed while selected', fakeAsync(() => {
      const component: NzTabsComponent = fixture.debugElement.query(By.css('nz-tabs'))!.componentInstance;

      const numberOfTabs = component.tabs.length;
      fixture.componentInstance.selectedIndex = numberOfTabs - 1;
      fixture.detectChanges();
      flush();

      // Remove last tab while last tab is selected, expect the next tab over to be selected
      fixture.componentInstance.tabs.pop();
      fixture.detectChanges();
      flush();

      expect(component.nzSelectedIndex).toBe(numberOfTabs - 2);
      expect(fixture.componentInstance.selectedIndex).toBe(numberOfTabs - 2);
    }));

    it('should maintain the selected tab if a new tab is added', () => {
      fixture.detectChanges();
      const component: NzTabsComponent = fixture.debugElement.query(By.css('nz-tabs'))!.componentInstance;

      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();

      // Add a new tab at the beginning.
      fixture.componentInstance.tabs.unshift({ title: 'New tab', content: 'at the start' });
      fixture.detectChanges();

      expect(component.nzSelectedIndex).toBe(2);
      expect(component.tabs.toArray()[2].isActive).toBe(true);
    });

    it('should maintain the selected tab if a tab is removed', () => {
      // Select the second tab.
      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();

      const component: NzTabsComponent = fixture.debugElement.query(By.css('nz-tabs'))!.componentInstance;

      // Remove the first tab that is right before the selected one.
      fixture.componentInstance.tabs.splice(0, 1);
      fixture.detectChanges();

      // Since the first tab has been removed and the second one was selected before, the selected
      // tab moved one position to the right. Meaning that the tab is now the first tab.
      expect(component.nzSelectedIndex).toBe(0);
      expect(component.tabs.toArray()[0].isActive).toBe(true);
    });

    it('should be able to select a new tab after creation', fakeAsync(() => {
      fixture.detectChanges();
      const component: NzTabsComponent = fixture.debugElement.query(By.css('nz-tabs'))!.componentInstance;

      fixture.componentInstance.tabs.push({ title: 'Last tab', content: 'at the end' });
      fixture.componentInstance.selectedIndex = 3;

      fixture.detectChanges();
      flush();

      expect(component.nzSelectedIndex).toBe(3);
      expect(component.tabs.toArray()[3].isActive).toBe(true);
    }));

    it('should not fire `selectedTabChange` when the amount of tabs changes', fakeAsync(() => {
      fixture.detectChanges();
      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();

      // Add a new tab at the beginning.
      spyOn(fixture.componentInstance, 'handleSelection');
      fixture.componentInstance.tabs.unshift({ title: 'New tab', content: 'at the start' });
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(fixture.componentInstance.handleSelection).not.toHaveBeenCalled();
    }));

    it('should show add btn after all tabs are removed', () => {
      const component = fixture.debugElement.componentInstance;
      component.closable = true;
      component.type = 'editable-card';
      fixture.detectChanges();
      fixture.componentInstance.tabs.splice(0, component.tabs.length);
      fixture.detectChanges();
      const btnCount = fixture.debugElement.queryAll(By.css('.ant-tabs-nav-add')).length;
      expect(btnCount).toBeGreaterThan(0);
    });
  });

  describe('async tabs', () => {
    it('should show tabs when they are available', fakeAsync(() => {
      const fixture = TestBed.createComponent(AsyncTabsTestComponent);

      expect(fixture.debugElement.queryAll(By.css('.ant-tabs-tab')).length).toBe(0);

      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      tick(200);

      expect(fixture.debugElement.queryAll(By.css('.ant-tabs-tab')).length).toBe(3);
    }));
  });

  describe('nested tabs', () => {
    it('should not pick up the tabs from descendant tab groups', () => {
      const fixture = TestBed.createComponent(NestedTabsTestComponent);
      fixture.detectChanges();

      const groups = fixture.componentInstance.tabSets.toArray();

      expect(groups.length).toBe(2);
      expect(groups[0].tabs.map((tab: NzTabComponent) => tab.nzTitle)).toEqual(['Tab 0', 'Tab 1']);
      expect(groups[1].tabs.map((tab: NzTabComponent) => tab.nzTitle)).toEqual(['Inner Tab 0', 'Inner Tab 1']);
    });

    it('should pick up indirect descendant tabs', () => {
      const fixture = TestBed.createComponent(TabSetWithIndirectDescendantTabsTestComponent);
      fixture.detectChanges();

      const tabs = fixture.componentInstance.tabSet.tabs;
      expect(tabs.map((tab: NzTabComponent) => tab.nzTitle)).toEqual(['Tab 0', 'Tab 1']);
    });
  });

  describe('scrollable', () => {
    let fixture: ComponentFixture<ScrollableTabsTestComponent>;
    let element: HTMLElement;
    let overlayContainerElement: HTMLElement;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ScrollableTabsTestComponent);
      element = fixture.nativeElement;

      inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainerElement = oc.getContainerElement();
      })();

      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
    }));

    it('should hide the overflow tabs', () => {
      const tabSetComponent = fixture.componentInstance.tabSet;
      expect(tabSetComponent.tabNavBarRef.hiddenItems.length).toBeGreaterThan(0);
      expect(element.querySelector('nz-tab-nav-operation')).not.toBeNull();
    });

    it('should get the correct outlet', fakeAsync(() => {
      fixture.detectChanges();
      flush(300);
      fixture.detectChanges();
      const inTabs = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'));
      inTabs.forEach(tab => {
        expect(tab.nativeElement.textContent.trim()).toBe('Title in tabs');
      });

      dispatchFakeEvent(element.querySelector('nz-tab-nav-operation')!, 'mouseenter');
      fixture.detectChanges();
      flush(300);
      fixture.detectChanges();

      const inMenu = overlayContainerElement.querySelectorAll<HTMLLIElement>('.ant-tabs-dropdown-menu-item');
      inMenu.forEach((tab: HTMLLIElement) => {
        expect(tab.textContent!.trim()).toBe('Title in menu');
      });
    }));

    it('should set transform to visible when selected invisible tab', fakeAsync(() => {
      const tabsList = element.querySelector('.ant-tabs-nav-list')! as HTMLElement;
      const translateX = getTranslate(tabsList.style.transform).x;
      fixture.componentInstance.selectedIndex = 10;
      fixture.detectChanges();
      flush(300);
      fixture.detectChanges();

      const newTranslateX = getTranslate(tabsList.style.transform).x;
      expect(translateX).toBeGreaterThan(newTranslateX);
    }));

    it('should handle the positions correctly', fakeAsync(() => {
      fixture.componentInstance.position = 'left';
      fixture.detectChanges();

      const tabsList = element.querySelector('.ant-tabs-nav-list')! as HTMLElement;
      const translateY = getTranslate(tabsList.style.transform).y;
      const translateX = getTranslate(tabsList.style.transform).x;

      expect(translateX).toBe(0);
      expect(translateY).toBe(0);

      fixture.componentInstance.selectedIndex = 15;
      fixture.detectChanges();
      flush(300);
      fixture.detectChanges();

      const newTranslateX = getTranslate(tabsList.style.transform).x;
      const newTranslateY = getTranslate(tabsList.style.transform).y;
      expect(translateX).toBe(newTranslateX);
      expect(translateY).toBeGreaterThan(newTranslateY);
    }));

    it('should set transform to visible and select when selected on nav-operation', fakeAsync(() => {
      spyOn(fixture.componentInstance, 'handleSelection');
      fixture.detectChanges();
      expect(fixture.componentInstance.handleSelection).toHaveBeenCalledTimes(0);

      const tabsList = element.querySelector('.ant-tabs-nav-list')! as HTMLElement;
      const translateX = getTranslate(tabsList.style.transform).x;
      const navOperation = fixture.debugElement.query(By.css('nz-tab-nav-operation'))!
        .componentInstance as NzTabNavOperationComponent;

      navOperation.onSelect(navOperation.items[5]);

      fixture.detectChanges();
      flush(300);
      fixture.detectChanges();

      const newTranslateX = getTranslate(tabsList.style.transform).x;
      expect(translateX).toBeGreaterThan(newTranslateX);
      expect(fixture.componentInstance.handleSelection).toHaveBeenCalledTimes(1);
    }));

    it('should set transformX when scroll(mock)', fakeAsync(() => {
      const tabNavBarComponent = fixture.debugElement.query(By.directive(NzTabNavBarComponent))!
        .componentInstance as NzTabNavBarComponent;
      const tabsList = element.querySelector('.ant-tabs-nav-list')! as HTMLElement;
      let translateX = getTranslate(tabsList.style.transform).x;

      expect(translateX).toBe(0);
      expect(tabNavBarComponent).toBeDefined();

      const event = {
        x: -200,
        y: -200,
        event: new Event('wheel')
      };

      tabNavBarComponent.onOffsetChange(event);

      fixture.detectChanges();
      flush(300);
      fixture.detectChanges();

      translateX = getTranslate(tabsList.style.transform).x;
      expect(translateX).toBe(-200);
    }));

    it('should set transformY when scroll(mock)', fakeAsync(() => {
      fixture.componentInstance.position = 'left';
      fixture.detectChanges();

      const tabNavBarComponent = fixture.debugElement.query(By.directive(NzTabNavBarComponent))!
        .componentInstance as NzTabNavBarComponent;
      const tabsList = element.querySelector('.ant-tabs-nav-list')! as HTMLElement;
      let translateY = getTranslate(tabsList.style.transform).y;

      expect(translateY).toBe(0);

      const event = {
        x: -100,
        y: -200,
        event: new Event('wheel')
      };

      tabNavBarComponent.onOffsetChange(event);

      fixture.detectChanges();
      flush(300);
      fixture.detectChanges();

      translateY = getTranslate(tabsList.style.transform).y;
      expect(translateY).toBe(-200);
    }));
  });

  function checkSelectedIndex(expectedIndex: number, fixture: ComponentFixture<NzSafeAny>): void {
    fixture.detectChanges();
    const tabComponent: NzTabsComponent = fixture.debugElement.query(By.css('nz-tabs'))!.componentInstance;

    expect(tabComponent.nzSelectedIndex).toBe(expectedIndex);

    const tabElement = fixture.debugElement.query(
      By.css(`.ant-tabs-tab:nth-of-type(${expectedIndex + 1})`)
    )!.nativeElement;
    expect(tabElement.classList.contains('ant-tabs-tab-active')).toBe(true);

    const tabpaneElement: HTMLDivElement = fixture.debugElement.query(
      By.css(`.ant-tabs-tabpane-active`)
    )!.nativeElement;
    expect(tabpaneElement.id.endsWith(`tab-${expectedIndex}`)).toBeTrue();
  }

  describe('router', () => {
    let fixture: ComponentFixture<RouterTabsTestComponent>;
    let tabs: DebugElement;
    let router: Router;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNzNoAnimation(), provideNzIconsTesting(), provideRouter(routes)]
      });

      fixture = TestBed.createComponent(RouterTabsTestComponent);
      fixture.detectChanges();

      tabs = fixture.debugElement.query(By.directive(NzTabsComponent));
    });

    it('should change router and emit handleSelection once when click', fakeAsync(() => {
      fixture.ngZone!.run(() => {
        router = TestBed.inject(Router);
        router.initialNavigation();
        const component = fixture.componentInstance;
        spyOn(component, 'handleSelection');
        fixture.detectChanges();

        expect((tabs.componentInstance as NzTabsComponent).nzSelectedIndex).toBe(0);
        expect(component.handleSelection).toHaveBeenCalledTimes(0);

        // select the second tab
        const tabLabel = fixture.debugElement.queryAll(By.css('.ant-tabs-tab'))[1];
        tabLabel.nativeElement.click();
        fixture.detectChanges();
        flush();

        expect((tabs.componentInstance as NzTabsComponent).nzSelectedIndex).toBe(1);
        expect(component.handleSelection).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('rendering', () => {
    let fixture: ComponentFixture<SimpleTabsRenderingComponent>;
    let element: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SimpleTabsRenderingComponent);
      element = fixture.nativeElement;
      fixture.detectChanges();
      tick();
    }));

    it('should delay rendering and preserve DOM of tabpane', fakeAsync(() => {
      expect(element.querySelectorAll('.ant-tabs-tabpane').length).toBe(1);
      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();
      tick(300);
      expect(element.querySelectorAll('.ant-tabs-tabpane').length).toBe(2);
      fixture.componentInstance.selectedIndex = 2;
      fixture.detectChanges();
      tick(300);
      expect(element.querySelectorAll('.ant-tabs-tabpane').length).toBe(3);
    }));

    it('should render inactive tab when forceRender is true', fakeAsync(() => {
      fixture.componentInstance.forceRender = true;
      fixture.detectChanges();
      tick(300);
      expect(element.querySelectorAll('.ant-tabs-tabpane').length).toBe(3);
    }));

    it('should destroy inactive tab when destroyInactiveTabPane is true', fakeAsync(() => {
      fixture.componentInstance.destroyInactiveTabPane = true;
      fixture.detectChanges();
      tick(300);
      expect(element.querySelectorAll('.ant-tabs-tabpane').length).toBe(1);

      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();
      tick(300);
      expect(element.querySelectorAll('.ant-tabs-tabpane').length).toBe(1);

      fixture.componentInstance.selectedIndex = 2;
      fixture.detectChanges();
      tick(300);
      expect(element.querySelectorAll('.ant-tabs-tabpane').length).toBe(1);
    }));
  });

  describe('dynamic router tabs', () => {
    let fixture: ComponentFixture<DynamicRouterTabsTestComponent>;
    let router: Router;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideRouter([
            {
              path: '',
              pathMatch: 'full',
              redirectTo: 'one'
            },
            {
              path: 'one',
              component: DynamicRouterTabsTestComponent
            },
            {
              path: 'two',
              component: DynamicRouterTabsTestComponent
            },
            {
              path: 'three',
              component: DynamicRouterTabsTestComponent
            }
          ])
        ]
      });

      router = TestBed.inject(Router);
      fixture = TestBed.createComponent(DynamicRouterTabsTestComponent);
    });

    it('should update active tab when tabs changed', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      router.initialNavigation();
      tick();
      fixture.detectChanges();

      const comp = fixture.componentInstance;

      router.navigate(['three']);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      comp.tabs = comp.lazyTabs;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();

      expect(comp.selectedIdx).toBe(2);
      flush();
    }));
  });

  describe('extra content', () => {
    it('should be possible to render additional content on both sides', () => {
      const fixture = TestBed.createComponent(SimpleTabsWithExtraContentComponent);
      fixture.detectChanges();
      const tabsNav: HTMLDivElement = fixture.nativeElement.querySelector('.ant-tabs-nav');
      expect(tabsNav.firstElementChild?.classList).toContain('ant-tabs-extra-content');
      expect(tabsNav.firstElementChild?.textContent?.trim()).toEqual('Start Extra Action');
      expect(tabsNav.lastElementChild?.classList).toContain('ant-tabs-extra-content');
      expect(tabsNav.lastElementChild?.textContent?.trim()).toEqual('End Extra Action');
    });
  });
});

@Component({
  imports: [NzTabsModule],
  template: `
    <nz-tabs
      [(nzSelectedIndex)]="selectedIndex"
      (nzSelectedIndexChange)="handleSelection($event)"
      (nzClose)="handleClose($event)"
      (nzAdd)="handleAdd()"
      [nzTabPosition]="position"
      [nzType]="type"
      [nzSize]="size"
      [nzTabBarGutter]="tabBarGutter"
      [nzTabBarStyle]="tabBarStyle"
      [nzCentered]="centered"
      [nzCanDeactivate]="canDeactivate"
      [nzTabBarExtraContent]="extraTemplate"
    >
      <nz-tab nzTitle="Tab 0" nzClosable>Content of Tab Pane 0</nz-tab>
      <nz-tab nzTitle="Tab 1" nzClosable>Content of Tab Pane 1</nz-tab>
      <nz-tab nzTitle="Tab 2">Content of Tab Pane 2</nz-tab>
    </nz-tabs>
    <ng-template #extraTemplate>
      <input type="text" class="extra-input" />
    </ng-template>
  `
})
class SimpleTabsTestComponent {
  selectedIndex = 1;
  position: NzTabPosition = 'top';
  size: NzSizeLDSType = 'default';
  type: NzTabType = 'line';
  tabBarGutter?: number;
  tabBarStyle: Record<string, string> | null = {};
  centered = false;
  canDeactivate = null;

  handleSelection(_event: number): void {}

  handleClose(_event: { index: number }): void {}

  handleAdd(): void {}
}

@Component({
  imports: [NzTabsModule],
  template: `
    <nz-tabs [(nzSelectedIndex)]="selectedIndex" [nzDestroyInactiveTabPane]="destroyInactiveTabPane">
      <nz-tab nzTitle="Tab 0" [nzForceRender]="forceRender">Content of Tab Pane 0</nz-tab>
      <nz-tab nzTitle="Tab 1" [nzForceRender]="forceRender">Content of Tab Pane 1</nz-tab>
      <nz-tab nzTitle="Tab 2" [nzForceRender]="forceRender">Content of Tab Pane 2</nz-tab>
    </nz-tabs>
  `
})
class SimpleTabsRenderingComponent {
  selectedIndex = 0;
  forceRender = false;
  destroyInactiveTabPane = false;
}

@Component({
  imports: [NzTabsModule],
  template: `
    <nz-tabs nzType="editable-card" [(nzSelectedIndex)]="selectedIndex" [nzAddIcon]="addTemplate">
      <nz-tab nzTitle="Tab 0">Content of Tab Pane 0</nz-tab>
      <nz-tab nzClosable [nzTitle]="titleTemplate" [nzCloseIcon]="closeIconTemplate">
        <ng-template nz-tab>
          <span class="content">Template Content of Tab Pane 1</span>
        </ng-template>
      </nz-tab>
    </nz-tabs>

    <ng-template #titleTemplate>
      <span class="title">Template Title</span>
    </ng-template>
    <ng-template #closeIconTemplate>
      <span class="close-icon">x</span>
    </ng-template>
    <ng-template #addTemplate>
      <span class="add-icon">+</span>
    </ng-template>
  `
})
class TemplateTabsTestComponent {
  selectedIndex = 1;
}

@Component({
  imports: [NzTabsModule],
  template: `
    <nz-tabs
      nzType="editable-card"
      [(nzSelectedIndex)]="selectedIndex"
      (nzSelectedIndexChange)="handleSelection($event)"
    >
      <nz-tab nzTitle="Tab 0">Content of Tab Pane 0</nz-tab>
      <nz-tab nzTitle="Tab 1" nzClosable [nzDisabled]="disabled">Content of Tab Pane 1</nz-tab>
      <nz-tab nzTitle="Tab 2" nzDisabled>Content of Tab Pane 2</nz-tab>
    </nz-tabs>
  `
})
class DisableTabsTestComponent {
  selectedIndex = 1;
  disabled = false;
  @ViewChildren(NzTabComponent) tabs!: QueryList<NzTabComponent>;

  handleSelection(_event: number): void {}
}

@Component({
  imports: [NzTabsModule],
  template: `
    <nz-tabs
      [(nzSelectedIndex)]="selectedIndex"
      [nzType]="'editable-card'"
      (nzSelectedIndexChange)="handleSelection($event)"
    >
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="tab.title">
          {{ tab.content }}
        </nz-tab>
      }
    </nz-tabs>
  `
})
class DynamicTabsTestComponent {
  selectedIndex = 1;
  tabs = [
    { title: 'Tab 0', content: 'Content of Tab Pane 0' },
    { title: 'Tab 1', content: 'Content of Tab Pane 1' },
    { title: 'Tab 2', content: 'Content of Tab Pane 2' }
  ];

  handleSelection(_event: number): void {}
}

@Component({
  imports: [NzTabsModule],
  template: `
    <div style="width: 200px; height: 200px">
      <nz-tabs
        style="width: 200px; height: 200px"
        [(nzSelectedIndex)]="selectedIndex"
        (nzSelectedIndexChange)="handleSelection($event)"
        [nzTabPosition]="position"
      >
        @for (_tab of tabs; track i; let i = $index) {
          <nz-tab [nzTitle]="titleTemplate">
            <ng-template #titleTemplate let-visible="visible">Title in {{ visible ? 'tabs' : 'menu' }}</ng-template>
            Content of Tab Pane {{ i }}
          </nz-tab>
        }
      </nz-tabs>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: `
    @import '../style/testing.less';
    @import '../style/entry.less';
    @import './style/entry.less';
  `
})
class ScrollableTabsTestComponent {
  selectedIndex = 0;
  position: NzTabPosition = 'top';
  tabs: NzSafeAny[] = Array(30).fill(null);
  @ViewChild(NzTabsComponent, { static: true }) tabSet!: NzTabsComponent;

  handleSelection(_event: number): void {}
}

@Component({
  imports: [AsyncPipe, NzTabsModule],
  template: `
    <nz-tabs>
      @for (tab of tabs | async; track tab) {
        <nz-tab [nzTitle]="tab.title">
          {{ tab.content }}
        </nz-tab>
      }
    </nz-tabs>
  `
})
class AsyncTabsTestComponent implements OnInit {
  tabs!: Observable<Array<{ title: string; content: string }>>;

  ngOnInit(): void {
    this.tabs = new Observable(observer => {
      setTimeout(() =>
        observer.next([
          { title: 'Tab 0', content: 'Content of Tab Pane 0' },
          { title: 'Tab 1', content: 'Content of Tab Pane 1' },
          { title: 'Tab 2', content: 'Content of Tab Pane 2' }
        ])
      );
    });
  }
}

@Component({
  imports: [NzTabsModule],
  template: `
    <nz-tabs>
      <nz-tab nzTitle="Tab 0">Content of Tab Pane 0</nz-tab>
      <nz-tab nzTitle="Tab 1">
        Content of Tab Pane 1
        <nz-tabs>
          <nz-tab nzTitle="Inner Tab 0">Inner Content of Tab Pane 0</nz-tab>
          <nz-tab nzTitle="Inner Tab 1">Inner Content of Tab Pane 1</nz-tab>
        </nz-tabs>
      </nz-tab>
    </nz-tabs>
  `
})
class NestedTabsTestComponent {
  @ViewChildren(NzTabsComponent) tabSets!: QueryList<NzTabsComponent>;
}

@Component({
  imports: [NzTabsModule],
  template: `
    <nz-tabs>
      @if (true) {
        <ng-container>
          <nz-tab nzTitle="Tab 0">Tab one content</nz-tab>
          @if (true) {
            <ng-container>
              <nz-tab nzTitle="Tab 1">Tab two content</nz-tab>
            </ng-container>
          }
        </ng-container>
      }
    </nz-tabs>
  `
})
class TabSetWithIndirectDescendantTabsTestComponent {
  @ViewChild(NzTabsComponent, { static: true }) tabSet!: NzTabsComponent;
}

@Component({
  imports: [RouterLink, RouterOutlet, NzTabsModule],
  template: `
    <nz-tabs nzLinkRouter (nzSelectedIndexChange)="handleSelection($event)">
      <nz-tab nzTitle="default">
        <a *nzTabLink nz-tab-link [routerLink]="['.']">One</a>
        One
      </nz-tab>
      <nz-tab nzTitle="two">
        <a *nzTabLink nz-tab-link [routerLink]="['.', 'two']">Two</a>
        Two
      </nz-tab>
    </nz-tabs>
    <router-outlet></router-outlet>
  `
})
export class RouterTabsTestComponent {
  handleSelection(_event: number): void {}
}

@Component({
  template: `
    <nz-tabs nzLinkRouter [(nzSelectedIndex)]="selectedIdx" [nzLinkExact]="false">
      @for (tab of tabs; track tab.title) {
        <nz-tab>
          <a *nzTabLink nz-tab-link [routerLink]="tab.route">{{ tab.title }}</a>
          {{ tab.title }}
        </nz-tab>
      }
    </nz-tabs>
    <router-outlet></router-outlet>
  `,
  imports: [RouterLink, RouterOutlet, NzTabsModule]
})
export class DynamicRouterTabsTestComponent {
  selectedIdx = 0;
  tabs = [
    {
      title: 'one',
      route: ['one']
    },
    {
      title: 'two',
      route: ['two']
    }
  ];
  readonly lazyTabs = [
    ...this.tabs,
    {
      title: 'three',
      route: ['three']
    }
  ];
}

const routes: Routes = [
  {
    path: '',
    component: RouterTabsTestComponent,
    data: {
      path: ''
    }
  },
  {
    path: 'two',
    component: RouterTabsTestComponent,
    data: {
      path: 'two'
    }
  }
];

function getTranslate(transformValue: string): { x: number; y: number } {
  const match = transformValue.match(/translate\((-*[0-9]+px), (-*[0-9]+px)\)/);
  return {
    x: match && match[1] ? Number.parseFloat(match[1]) : 0,
    y: match && match[2] ? Number.parseFloat(match[2]) : 0
  };
}

@Component({
  imports: [NzTabsModule],
  template: `
    <nz-tabs [(nzSelectedIndex)]="selectedIndex">
      <button *nzTabBarExtraContent="'start'">Start Extra Action</button>
      <button *nzTabBarExtraContent="'end'">End Extra Action</button>

      <nz-tab nzTitle="Tab 0">Content of Tab Pane 0</nz-tab>
      <nz-tab nzTitle="Tab 1">Content of Tab Pane 1</nz-tab>
      <nz-tab nzTitle="Tab 2">Content of Tab Pane 2</nz-tab>
    </nz-tabs>
  `
})
class SimpleTabsWithExtraContentComponent {
  selectedIndex = 0;
}
