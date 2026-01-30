/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { ConnectedOverlayPositionChange, OverlayContainer } from '@angular/cdk/overlay';
import {
  Component,
  DebugElement,
  ElementRef,
  provideZoneChangeDetection,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchFakeEvent, provideMockDirectionality } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzSubmenuTrigger } from 'ng-zorro-antd/menu/menu.types';

import { NzMenuItemComponent } from './menu-item.component';
import { NzMenuDirective } from './menu.directive';
import { NzMenuModule } from './menu.module';
import { NzSubMenuComponent } from './submenu.component';

describe('menu', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [
        provideNzIconsTesting(),
        provideNzNoAnimation(),
        provideZoneChangeDetection(),
        provideMockDirectionality()
      ]
    });
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    oc.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  describe('basic', () => {
    describe('horizontal', () => {
      let fixture: ComponentFixture<NzTestBasicMenuHorizontalComponent>;
      let items: DebugElement[];
      let submenu: DebugElement;
      let menu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestBasicMenuHorizontalComponent);
        items = fixture.debugElement.queryAll(By.directive(NzMenuItemComponent));
        submenu = fixture.debugElement.query(By.directive(NzSubMenuComponent));
        menu = fixture.debugElement.query(By.directive(NzMenuDirective));
      });

      it('should className correct', () => {
        fixture.detectChanges();
        expect(items.every(item => item.nativeElement.classList.contains('ant-menu-item'))).toBe(true);
        expect(items[1].nativeElement.classList.contains('ant-menu-item-disabled')).toBe(true);
        expect(submenu.nativeElement.classList.contains('ant-menu-submenu-horizontal')).toBe(true);
        expect(submenu.nativeElement.classList.contains('ant-menu-submenu')).toBe(true);
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-light ant-menu-horizontal');
      });

      it('should menu item select', () => {
        fixture.detectChanges();
        items[0].nativeElement.click();
        fixture.detectChanges();
        expect(items[0].nativeElement.classList.contains('ant-menu-item-selected')).toBe(true);
      });

      it('should menu disabled work', () => {
        fixture.detectChanges();
        items[1].nativeElement.click();
        fixture.detectChanges();
        expect(items[0].nativeElement.classList.contains('ant-menu-item-selected')).toBe(false);
      });

      it('should menu danger work', () => {
        fixture.detectChanges();
        expect(items[3].nativeElement.classList.contains('ant-menu-item-danger')).toBe(true);
      });
    });

    describe('inline', () => {
      let fixture: ComponentFixture<NzTestBasicMenuInlineComponent>;
      let items: DebugElement[];
      let submenus: DebugElement[];
      let menu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestBasicMenuInlineComponent);
        items = fixture.debugElement.queryAll(By.directive(NzMenuItemComponent));
        menu = fixture.debugElement.query(By.directive(NzMenuDirective));
        submenus = fixture.debugElement.queryAll(By.directive(NzSubMenuComponent));
      });

      it('should className correct', () => {
        fixture.detectChanges();
        expect(submenus.every(subitem => subitem.nativeElement.classList.contains('ant-menu-submenu'))).toBe(true);
        expect(submenus.every(subitem => subitem.nativeElement.classList.contains('ant-menu-submenu-inline'))).toBe(
          true
        );
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-light ant-menu-inline');
      });

      it('should padding left work', () => {
        fixture.detectChanges();
        const firstLevelItems = items;
        const secondLevelItems = firstLevelItems.splice(6, 2);
        expect(firstLevelItems.every(item => item.nativeElement.style.paddingLeft === '48px')).toBe(true);
        expect(secondLevelItems.every(item => item.nativeElement.style.paddingLeft === '72px')).toBe(true);
      });

      it('should click expand', fakeAsync(() => {
        fixture.detectChanges();
        const ul = submenus[0].nativeElement.querySelector('.ant-menu');
        const title = submenus[0].nativeElement.querySelector('.ant-menu-submenu-title');
        expect(ul.style.height).toBe('0px');
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).not.toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(false);
      }));
    });

    describe('inline-collapsed', () => {
      let fixture: ComponentFixture<NzTestMenuInlineCollapsedComponent>;
      let testComponent: NzTestMenuInlineCollapsedComponent;
      let submenus: DebugElement[];
      let menu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestMenuInlineCollapsedComponent);
        testComponent = fixture.debugElement.componentInstance;
        submenus = fixture.debugElement.queryAll(By.directive(NzSubMenuComponent));
        menu = fixture.debugElement.query(By.directive(NzMenuDirective));
      });

      it('should className correct', () => {
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-dark ant-menu-inline');
        testComponent.isCollapsed = true;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe(
          'ant-menu ant-menu-root ant-menu-dark ant-menu-vertical ant-menu-inline-collapsed'
        );
        testComponent.isCollapsed = false;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-dark ant-menu-inline');
      });

      it('should keep open after change mode', () => {
        fixture.detectChanges();
        let ul = submenus[0].nativeElement.querySelector('.ant-menu');
        const title = submenus[0].nativeElement.querySelector('.ant-menu-submenu-title');
        expect(ul.style.height).toBe('0px');
        testComponent.isCollapsed = true;
        fixture.detectChanges();
        testComponent.isCollapsed = false;
        fixture.detectChanges();
        ul = submenus[0].nativeElement.querySelector('.ant-menu');
        expect(ul.style.height).toBe('0px');
        title.click();
        fixture.detectChanges();
        expect(ul.style.height).not.toBe('0px');
        testComponent.isCollapsed = true;
        fixture.detectChanges();
        testComponent.isCollapsed = false;
        fixture.detectChanges();
        expect(ul.style.height).not.toBe('0px');
      });
    });

    describe('slider-current', () => {
      let fixture: ComponentFixture<NzTestMenuSiderCurrentComponent>;
      let submenus: DebugElement[];
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestMenuSiderCurrentComponent);
        submenus = fixture.debugElement.queryAll(By.directive(NzSubMenuComponent));
      });

      it('should collapsed self work', fakeAsync(() => {
        fixture.detectChanges();
        const ul = submenus[0].nativeElement.querySelector('.ant-menu');
        const title = submenus[0].nativeElement.querySelector('.ant-menu-submenu-title');
        expect(ul.style.height).not.toBe('0px');
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(false);
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).not.toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);
      }));

      it('should collapsed other work', fakeAsync(() => {
        fixture.detectChanges();
        const firstUl = submenus[0].nativeElement.querySelector('.ant-menu');
        const secondUl = submenus[1].nativeElement.querySelector('.ant-menu');
        const secondTitle = submenus[1].nativeElement.querySelector('.ant-menu-submenu-title');
        expect(firstUl.style.height).not.toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);
        secondTitle.click();
        fixture.detectChanges();
        tick(500);
        expect(firstUl.style.height).toBe('0px');
        expect(submenus[0].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(false);
        expect(secondUl.style.height).not.toBe('0px');
        expect(submenus[1].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);
      }));
    });

    describe('theme', () => {
      let fixture: ComponentFixture<NzTestMenuThemeComponent>;
      let testComponent: NzTestMenuThemeComponent;
      let menu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestMenuThemeComponent);
        testComponent = fixture.debugElement.componentInstance;
        menu = fixture.debugElement.query(By.directive(NzMenuDirective));
      });

      it('should className correct', () => {
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-dark ant-menu-inline');
        testComponent.theme = false;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-inline ant-menu-light');
      });
    });

    describe('switch-mode', () => {
      let fixture: ComponentFixture<NzTestMenuSwitchModeComponent>;
      let testComponent: NzTestMenuSwitchModeComponent;
      let submenus: DebugElement[];
      let menu: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestMenuSwitchModeComponent);
        testComponent = fixture.debugElement.componentInstance;
        submenus = fixture.debugElement.queryAll(By.directive(NzSubMenuComponent));
        menu = fixture.debugElement.query(By.directive(NzMenuDirective));
      });

      it('should className correct', () => {
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-light ant-menu-inline');
        expect(submenus.every(submenu => submenu.nativeElement.classList.contains('ant-menu-submenu-inline'))).toBe(
          true
        );
        testComponent.mode = true;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-light ant-menu-vertical');
        expect(submenus.every(submenu => submenu.nativeElement.classList.contains('ant-menu-submenu-inline'))).toBe(
          false
        );
        expect(submenus.every(submenu => submenu.nativeElement.classList.contains('ant-menu-submenu-vertical'))).toBe(
          true
        );
      });
    });
  });

  describe('submenu', () => {
    describe('horizontal submenu', () => {
      let fixture: ComponentFixture<NzTestMenuHorizontalComponent>;
      let testComponent: NzTestMenuHorizontalComponent;
      let submenu: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestMenuHorizontalComponent);
        testComponent = fixture.debugElement.componentInstance;
        submenu = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      });

      it('should overlay work', fakeAsync(() => {
        fixture.detectChanges();
        expect(overlayContainerElement.textContent).toBe('');
        testComponent.open = true;
        fixture.detectChanges();
        expect(overlayContainerElement.textContent).not.toBe('');
      }));

      it('should submenu mouseenter work', () => {
        fixture.detectChanges();
        const mouseenterCallback = jasmine.createSpy('mouseenter callback');
        const subs = testComponent.subs.toArray();
        const title = submenu.nativeElement.querySelector('.ant-menu-submenu-title');

        (subs[0].nzSubmenuService as NzSafeAny).isMouseEnterTitleOrOverlay$.subscribe(mouseenterCallback);
        dispatchFakeEvent(title, 'mouseenter');
        fixture.detectChanges();
        expect(mouseenterCallback).toHaveBeenCalledWith(true);
        expect(mouseenterCallback).toHaveBeenCalledTimes(1);
      });

      it('should have "hover" as default trigger', () => {
        fixture.detectChanges();
        const mouseenterCallback = jasmine.createSpy('mouseenter callback');
        const subs = testComponent.subs.toArray();
        const title = submenu.nativeElement.querySelector('.ant-menu-submenu-title');

        (subs[0].nzSubmenuService as NzSafeAny).isMouseEnterTitleOrOverlay$.subscribe(mouseenterCallback);
        dispatchFakeEvent(title, 'mouseenter');
        fixture.detectChanges();
        expect(mouseenterCallback).toHaveBeenCalledWith(true);
        expect(mouseenterCallback).toHaveBeenCalledTimes(1);
      });

      it('should have not open with mouse hover if trigger is set to "click"', () => {
        testComponent.nzTriggerSubMenuAction = 'click';
        fixture.detectChanges();
        const mouseenterCallback = jasmine.createSpy('mouseenter callback');
        const subs = testComponent.subs.toArray();
        const title = submenu.nativeElement.querySelector('.ant-menu-submenu-title');

        (subs[0].nzSubmenuService as NzSafeAny).isMouseEnterTitleOrOverlay$.subscribe(mouseenterCallback);
        dispatchFakeEvent(title, 'mouseenter');
        fixture.detectChanges();
        expect(mouseenterCallback).toHaveBeenCalledTimes(0);
      });

      it('should open with mouse click if trigger is set to "click"', () => {
        testComponent.nzTriggerSubMenuAction = 'click';
        fixture.detectChanges();
        const mouseenterCallback = jasmine.createSpy('mouseenter callback');
        const subs = testComponent.subs.toArray();
        const title = submenu.nativeElement.querySelector('.ant-menu-submenu-title');
        (subs[0].nzSubmenuService as NzSafeAny).isMouseEnterTitleOrOverlay$.subscribe(mouseenterCallback);
        title.click();
        fixture.detectChanges();
        expect(mouseenterCallback).toHaveBeenCalledTimes(1);
      });

      it('should submenu mouseleave work', () => {
        fixture.detectChanges();
        const mouseleaveCallback = jasmine.createSpy('mouseleave callback');
        const subs = testComponent.subs.toArray();
        const title = submenu.nativeElement.querySelector('.ant-menu-submenu-title');

        (subs[0].nzSubmenuService as NzSafeAny).isMouseEnterTitleOrOverlay$.subscribe(mouseleaveCallback);
        dispatchFakeEvent(title, 'mouseleave');
        fixture.detectChanges();
        expect(mouseleaveCallback).toHaveBeenCalledWith(false);
        expect(mouseleaveCallback).toHaveBeenCalledTimes(1);
      });

      it('should nested submenu work', () => {
        testComponent.open = true;
        fixture.detectChanges();
        const nestedCallback = jasmine.createSpy('nested callback');
        const subs = testComponent.subs.toArray();

        (subs[0].nzSubmenuService as NzSafeAny).isChildSubMenuOpen$.subscribe(nestedCallback);
        subs[1].nzOpen = true;
        subs[1].nzSubmenuService.isCurrentSubMenuOpen$.next(false);
        fixture.detectChanges();
        expect(nestedCallback).toHaveBeenCalledWith(false);
        expect(nestedCallback).toHaveBeenCalledTimes(1);
      });

      it('should nested submenu disabled work', () => {
        testComponent.open = true;
        testComponent.disabled = true;
        fixture.detectChanges();
        const nestedCallback = jasmine.createSpy('nested callback');
        const subs = testComponent.subs.toArray();

        (subs[0].nzSubmenuService as NzSafeAny).isChildSubMenuOpen$.subscribe(nestedCallback);
        subs[1].nzOpen = true;
        subs[1].nzSubmenuService.isCurrentSubMenuOpen$.next(false);
        fixture.detectChanges();
        expect(nestedCallback).toHaveBeenCalledTimes(1);
      });

      it('should click menu and other submenu menu not active', fakeAsync(() => {
        testComponent.open = true;
        fixture.detectChanges();
        const subs = testComponent.subs.toArray();
        dispatchFakeEvent(testComponent.menuitem1.nativeElement, 'mouseenter');
        fixture.detectChanges();
        testComponent.menuitem1.nativeElement.click();
        fixture.detectChanges();
        tick(500);
        expect(subs[1].isActive).toBe(false);
      }));

      it('should click submenu menu item close', () => {
        testComponent.open = true;
        fixture.detectChanges();
        const nestedCallback = jasmine.createSpy('nested callback');
        const subs = testComponent.subs.toArray();
        subs[1].nzOpen = true;
        fixture.detectChanges();

        (subs[1].nzSubmenuService as NzSafeAny).isChildSubMenuOpen$.subscribe(nestedCallback);
        testComponent.menuitem.nativeElement.click();
        fixture.detectChanges();
        expect(nestedCallback).toHaveBeenCalledWith(false);
        expect(nestedCallback).toHaveBeenCalledTimes(1);
      });

      it('should click submenu disabled menu item not close', () => {
        testComponent.open = true;
        fixture.detectChanges();
        const nestedCallback = jasmine.createSpy('nested callback');
        const subs = testComponent.subs.toArray();

        (subs[1].nzSubmenuService as NzSafeAny).isMouseEnterTitleOrOverlay$.subscribe(nestedCallback);
        subs[1].nzOpen = true;
        testComponent.disabledItem.nativeElement.click();
        fixture.detectChanges();
        expect(nestedCallback).toHaveBeenCalledTimes(0);
      });

      it('should width change correct', () => {
        fixture.detectChanges();
        testComponent.open = true;
        fixture.detectChanges();
        const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
        expect(overlayPane.style.width).toBe('200px');
        testComponent.open = false;
        fixture.detectChanges();
        testComponent.width = 300;
        fixture.detectChanges();
        testComponent.open = true;
        fixture.detectChanges();
        expect(overlayPane.style.width).toBe('300px');
      });

      it('should position change correct', () => {
        const fakeLeftTopEvent = {
          connectionPair: {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top'
          }
        } as ConnectedOverlayPositionChange;
        const fakeRightTopEvent = {
          connectionPair: {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top'
          }
        } as ConnectedOverlayPositionChange;
        fixture.detectChanges();
        testComponent.open = true;
        const subs = testComponent.subs.toArray();
        subs[1].nzOpen = true;
        fixture.detectChanges();
        subs[1].onPositionChange(fakeLeftTopEvent);
        fixture.detectChanges();
        expect(subs[1].position).toBe('left');
        subs[1].onPositionChange(fakeRightTopEvent);
        fixture.detectChanges();
        expect(subs[1].position).toBe('right');
      });

      it('should `nzMenuClassName` work', fakeAsync(() => {
        fixture.detectChanges();
        testComponent.open = true;
        fixture.detectChanges();
        expect((overlayContainerElement.querySelector('.submenu') as HTMLUListElement).classList).toContain(
          'ant-menu-sub'
        );
      }));

      it('should nested submenu `nzMenuClassName` work', () => {
        testComponent.open = true;
        fixture.detectChanges();
        const subs = testComponent.subs.toArray();
        subs[0].nzOpen = true;
        subs[1].nzOpen = true;

        (subs[1] as NzSafeAny).cdr.markForCheck();
        fixture.detectChanges();
        expect((overlayContainerElement.querySelector('.nested-submenu') as HTMLUListElement).classList).toContain(
          'ant-menu-sub'
        );
      });
    });

    describe('inline submenu', () => {
      let fixture: ComponentFixture<NzTestMenuInlineComponent>;
      let testComponent: NzTestMenuInlineComponent;
      let submenu: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestMenuInlineComponent);
        testComponent = fixture.debugElement.componentInstance;
        submenu = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      });

      it('should click expand', fakeAsync(() => {
        fixture.detectChanges();
        const ul = submenu.nativeElement.querySelector('.ant-menu');
        const title = submenu.nativeElement.querySelector('.ant-menu-submenu-title');
        expect(ul.style.height).toBe('0px');
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).not.toBe('0px');
        expect(submenu.nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);
      }));

      it('should `nzMenuClassName` work', fakeAsync(() => {
        fixture.detectChanges();
        expect(submenu.nativeElement.querySelector('.ant-menu-sub').className).toContain('submenu');
      }));

      it('should `nzMenuClassName` multi class names work', fakeAsync(() => {
        fixture.detectChanges();
        testComponent.submenuClassName = 'submenu submenu-1';
        fixture.detectChanges();
        expect(submenu.nativeElement.querySelector('.ant-menu-sub').className).toContain('submenu');
        expect(submenu.nativeElement.querySelector('.ant-menu-sub').className).toContain('submenu-1');
      }));

      it('should disabled work', fakeAsync(() => {
        testComponent.disabled = true;
        fixture.detectChanges();
        const ul = submenu.nativeElement.querySelector('.ant-menu');
        const title = submenu.nativeElement.querySelector('.ant-menu-submenu-title');
        expect(ul.style.height).toBe('0px');
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).toBe('0px');
        expect(submenu.nativeElement.classList.contains('ant-menu-submenu-open')).toBe(false);
      }));
    });

    describe('submenu default selected', () => {
      it('should default selected active submenu', () => {
        const fixture = TestBed.createComponent(NzTestSubMenuSelectedComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('.ant-menu-submenu').classList).toContain(
          'ant-menu-submenu-selected'
        );
      });
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<NzTestMenuHorizontalComponent>;
    let testComponent: NzTestMenuHorizontalComponent;
    let submenu: DebugElement;
    let menu: DebugElement;
    let directionality: Directionality;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestMenuHorizontalComponent);
      testComponent = fixture.componentInstance;
      submenu = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      menu = fixture.debugElement.query(By.directive(NzMenuDirective));
      directionality = TestBed.inject(Directionality);

      testComponent.open = true;
      directionality.valueSignal.set('rtl');
      fixture.detectChanges();
    });

    it('should className correct on dir change', () => {
      expect(submenu.nativeElement.classList.contains('ant-menu-submenu-rtl')).toBe(true);
      expect(menu.nativeElement.classList.contains('ant-menu-rtl')).toBe(true);

      directionality.valueSignal.set('ltr');
      fixture.detectChanges();

      expect(submenu.nativeElement.classList.contains('ant-menu-submenu-rtl')).toBe(false);
      expect(menu.nativeElement.classList.contains('ant-menu-rtl')).toBe(false);
    });

    it('should nested submenu work', () => {
      const subs = testComponent.subs.toArray();
      subs[0].nzOpen = true;
      fixture.detectChanges();

      expect((overlayContainerElement.querySelector('.ant-menu-submenu') as HTMLUListElement).classList).toContain(
        'ant-menu-submenu-rtl'
      );
    });
  });
});

@Component({
  selector: 'nz-test-menu-horizontal',
  imports: [NzIconModule, NzMenuModule],
  template: `
    <ul nz-menu nzMode="horizontal">
      <li
        nz-submenu
        [nzTriggerSubMenuAction]="nzTriggerSubMenuAction"
        nzMenuClassName="submenu"
        [nzOpen]="open"
        [style.width.px]="width"
      >
        <span title>
          <nz-icon nzType="setting" />
          Navigation Three - Submenu
        </span>
        <ul>
          <li nz-menu-group>
            <span title>Item 1</span>
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group>
            <span title>Item 2</span>
            <ul>
              <li nz-menu-item #menuitem1>Option 3</li>
              <li nz-menu-item>Option 4</li>
              <li nz-submenu nzMenuClassName="nested-submenu" [nzDisabled]="disabled">
                <span title>Sub Menu</span>
                <ul>
                  <li nz-menu-item #menuitem>Option 5</li>
                  <li nz-menu-item #disabledItem nzDisabled>Option 6</li>
                </ul>
              </li>
              <li nz-submenu nzDisabled>
                <span title>Disabled Sub Menu</span>
                <ul>
                  <li nz-menu-item>Option 5</li>
                  <li nz-menu-item>Option 6</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  `
})
export class NzTestMenuHorizontalComponent {
  width = 200;
  open = false;
  disabled = false;
  nzTriggerSubMenuAction: NzSubmenuTrigger = 'hover';
  @ViewChildren(NzSubMenuComponent) subs!: QueryList<NzSubMenuComponent>;
  @ViewChild('menuitem', { static: false, read: ElementRef }) menuitem!: ElementRef;
  @ViewChild('menuitem1', { static: false, read: ElementRef }) menuitem1!: ElementRef;
  @ViewChild('disabledItem', { static: false, read: ElementRef }) disabledItem!: ElementRef;
}

@Component({
  imports: [NzIconModule, NzMenuModule],
  template: `
    <ul nz-menu nzMode="inline" [nzInlineCollapsed]="collapse">
      <li nz-submenu [nzMenuClassName]="submenuClassName" [nzDisabled]="disabled">
        <span title>
          <nz-icon nzType="mail" />
          Navigation One
        </span>
        <ul>
          <li nz-menu-item style="padding-left:0">Option 1</li>
          <li nz-menu-item>Option 2</li>
        </ul>
      </li>
    </ul>
  `
})
export class NzTestMenuInlineComponent {
  disabled = false;
  collapse = false;
  submenuClassName = 'submenu';
  @ViewChild(NzSubMenuComponent, { static: true }) submenu!: NzSubMenuComponent;
}

@Component({
  imports: [NzIconModule, NzMenuModule],
  template: `
    <ul nz-menu nzMode="horizontal">
      <li nz-menu-item>
        <nz-icon nzType="mail" />
        Navigation One
      </li>
      <li nz-menu-item nzDisabled>
        <nz-icon nzType="appstore" />
        Navigation Two
      </li>
      <li nz-submenu nzTitle="Navigation Three - Submenu" nzIcon="setting">
        <ul>
          <li nz-menu-group nzTitle="Item 1">
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="Item 2">
            <ul>
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
              <li nz-submenu nzTitle="Sub Menu">
                <ul>
                  <li nz-menu-item nzDisabled>Option 5</li>
                  <li nz-menu-item>Option 6</li>
                </ul>
              </li>
              <li nz-submenu nzDisabled nzTitle="Disabled Sub Menu">
                <ul>
                  <li nz-menu-item>Option 5</li>
                  <li nz-menu-item>Option 6</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-menu-item>
        <a href="https://ng.ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
      </li>
      <li nz-menu-item nzDanger>Navigation Five</li>
    </ul>
  `
})
export class NzTestBasicMenuHorizontalComponent {}

@Component({
  imports: [NzMenuModule],
  template: `
    <ul nz-menu nzMode="inline">
      <li nz-submenu nzTitle="Navigation One" nzIcon="mail">
        <ul>
          <li nz-menu-group nzTitle="Item 1">
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="Item 2">
            <ul>
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Navigation Two" nzIcon="appstore">
        <ul>
          <li nz-menu-item>Option 5</li>
          <li nz-menu-item>Option 6</li>
          <li nz-submenu nzTitle="Submenu">
            <ul>
              <li nz-menu-item>Option 7</li>
              <li nz-menu-item>Option 8</li>
              <li nz-submenu nzTitle="Submenu">
                <ul>
                  <li nz-menu-item>Option 9</li>
                  <li nz-menu-item>Option 10</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Navigation Three" nzIcon="setting">
        <ul>
          <li nz-menu-item>Option 11</li>
          <li nz-menu-item>Option 12</li>
          <li nz-menu-item>Option 13</li>
        </ul>
      </li>
    </ul>
  `
})
export class NzTestBasicMenuInlineComponent {}

// https://github.com/NG-ZORRO/ng-zorro-antd/issues/3345
@Component({
  imports: [NzIconModule, NzMenuModule],
  template: `
    <ul nz-menu nzMode="inline" nzTheme="dark" nzInlineCollapsed>
      <li nz-menu-item>
        <nz-icon nzType="mail" />
        <span>Navigation One</span>
      </li>
      <li nz-submenu nzTitle="Navigation Two" nzIcon="appstore">
        <ul>
          <li nz-menu-item nzSelected>Option 5</li>
          <li nz-menu-item>Option 6</li>
        </ul>
      </li>
    </ul>
  `
})
export class NzTestSubMenuSelectedComponent {}

@Component({
  imports: [NzButtonModule, NzIconModule, NzMenuModule],
  template: `
    <div class="wrapper">
      <button nz-button nzType="primary" (click)="toggleCollapsed()">
        <nz-icon [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'" />
      </button>
      <ul nz-menu nzMode="inline" nzTheme="dark" [nzInlineCollapsed]="isCollapsed">
        <li nz-menu-item nzSelected>
          <nz-icon nzType="mail" />
          <span>Navigation One</span>
        </li>
        <li nz-submenu nzTitle="Navigation Two" nzIcon="appstore">
          <ul>
            <li nz-menu-item>Option 5</li>
            <li nz-menu-item>Option 6</li>
            <li nz-submenu nzTitle="Submenu">
              <ul>
                <li nz-menu-item>Option 7</li>
                <li nz-menu-item>Option 8</li>
              </ul>
            </li>
          </ul>
        </li>
        <li nz-submenu nzTitle="Navigation Three" nzIcon="setting">
          <ul>
            <li nz-menu-item>Option 9</li>
            <li nz-menu-item>Option 10</li>
            <li nz-menu-item>Option 11</li>
          </ul>
        </li>
      </ul>
    </div>
  `
})
export class NzTestMenuInlineCollapsedComponent {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}

@Component({
  imports: [NzMenuModule],
  template: `
    <ul nz-menu nzMode="inline" style="width: 240px;">
      <li
        nz-submenu
        [(nzOpen)]="openMap.sub1"
        (nzOpenChange)="openHandler('sub1')"
        nzTitle="Navigation One"
        nzIcon="mail"
      >
        <ul>
          <li nz-menu-group nzTitle="Item 1">
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="Item 2">
            <ul>
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        nz-submenu
        [(nzOpen)]="openMap.sub2"
        (nzOpenChange)="openHandler('sub2')"
        nzTitle="Navigation Two"
        nzIcon="appstore"
      >
        <ul>
          <li nz-menu-item>Option 5</li>
          <li nz-menu-item>Option 6</li>
          <li nz-submenu nzTitle="Submenu">
            <ul>
              <li nz-menu-item>Option 7</li>
              <li nz-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        nz-submenu
        [(nzOpen)]="openMap.sub3"
        (nzOpenChange)="openHandler('sub3')"
        nzTitle="Navigation Three"
        nzIcon="setting"
      >
        <ul>
          <li nz-menu-item>Option 9</li>
          <li nz-menu-item>Option 10</li>
          <li nz-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `
})
export class NzTestMenuSiderCurrentComponent {
  openMap: Record<string, boolean> = {
    sub1: true,
    sub2: false,
    sub3: false
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }
}

@Component({
  imports: [NzMenuModule],
  template: `
    <ul nz-menu [nzMode]="mode ? 'vertical' : 'inline'" [nzTheme]="dark ? 'dark' : 'light'">
      <li nz-submenu nzTitle="Navigation One" nzIcon="mail">
        <ul>
          <li nz-menu-group nzTitle="Item 1">
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="Item 2">
            <ul>
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Navigation Two" nzIcon="appstore">
        <ul>
          <li nz-menu-item>Option 5</li>
          <li nz-menu-item>Option 6</li>
          <li nz-submenu nzTitle="Submenu">
            <ul>
              <li nz-menu-item>Option 7</li>
              <li nz-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Navigation Three" nzIcon="setting">
        <ul>
          <li nz-menu-item>Option 9</li>
          <li nz-menu-item>Option 10</li>
          <li nz-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `
})
export class NzTestMenuSwitchModeComponent {
  mode = false;
  dark = false;
}

@Component({
  imports: [NzMenuModule],
  template: `
    <ul nz-menu nzMode="inline" style="width: 240px;" [nzTheme]="theme ? 'dark' : 'light'">
      <li nz-submenu nzOpen nzTitle="Navigation One" nzIcon="mail">
        <ul>
          <li nz-menu-group nzTitle="Item 1">
            <ul>
              <li nz-menu-item nzSelected>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="Item 2">
            <ul>
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Navigation Two" nzIcon="appstore">
        <ul>
          <li nz-menu-item>Option 5</li>
          <li nz-menu-item>Option 6</li>
          <li nz-submenu nzTitle="Submenu">
            <ul>
              <li nz-menu-item>Option 7</li>
              <li nz-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Navigation Three" nzIcon="setting">
        <ul>
          <li nz-menu-item>Option 9</li>
          <li nz-menu-item>Option 10</li>
          <li nz-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `
})
export class NzTestMenuThemeComponent {
  theme = true;
}
