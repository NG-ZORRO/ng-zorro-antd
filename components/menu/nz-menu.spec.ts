import { Directionality } from '@angular/cdk/bidi';
import { ConnectedOverlayPositionChange, OverlayContainer } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, ElementRef, NO_ERRORS_SCHEMA, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { async, fakeAsync, inject, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import { dispatchFakeEvent } from '../core/testing';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzDemoMenuHorizontalComponent } from './demo/horizontal';
import { NzDemoMenuInlineComponent } from './demo/inline';
import { NzDemoMenuInlineCollapsedComponent } from './demo/inline-collapsed';
import { NzDemoMenuSiderCurrentComponent } from './demo/sider-current';
import { NzDemoMenuSwitchModeComponent } from './demo/switch-mode';
import { NzDemoMenuThemeComponent } from './demo/theme';
import { NzMenuItemDirective } from './nz-menu-item.directive';
import { NzMenuDirective } from './nz-menu.directive';
import { NzMenuModule } from './nz-menu.module';
import { NzSubMenuComponent } from './nz-submenu.component';

describe('menu', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  const scrolledSubject = new Subject();
  beforeEach(async(() => {
    const dir = 'ltr';
    TestBed.configureTestingModule({
      imports     : [ NzMenuModule, NoopAnimationsModule, NoopAnimationsModule, NzIconModule ],
      declarations: [ NzDemoMenuHorizontalComponent, NzDemoMenuInlineComponent, NzDemoMenuInlineCollapsedComponent, NzDemoMenuSiderCurrentComponent, NzDemoMenuThemeComponent, NzDemoMenuSwitchModeComponent, NzTestMenuHorizontalComponent, NzTestMenuInlineComponent, NzDemoMenuNgForComponent ],
      schemas     : [ NO_ERRORS_SCHEMA ],
      providers   : [
        { provide: Directionality, useFactory: () => ({ value: dir }) },
        { provide: ScrollDispatcher, useFactory: () => ({ scrolled: () => scrolledSubject }) }
      ]
    });

    TestBed.compileComponents();

    inject([ OverlayContainer ], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));

  afterEach(inject([ OverlayContainer ], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));
  describe('demo', () => {
    describe('horizontal', () => {
      let fixture;
      let testComponent;
      let items;
      let submenu;
      let menu;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzDemoMenuHorizontalComponent);
        testComponent = fixture.debugElement.componentInstance;
        items = fixture.debugElement.queryAll(By.directive(NzMenuItemDirective));
        submenu = fixture.debugElement.query(By.directive(NzSubMenuComponent));
        menu = fixture.debugElement.query(By.directive(NzMenuDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(items.every(item => item.nativeElement.classList.contains('ant-menu-item'))).toBe(true);
        expect(items[ 1 ].nativeElement.classList.contains('ant-menu-item-disabled')).toBe(true);
        expect(submenu.nativeElement.classList.contains('ant-menu-submenu-horizontal')).toBe(true);
        expect(submenu.nativeElement.classList.contains('ant-menu-submenu')).toBe(true);
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-light ant-menu-horizontal');
      });
      it('should menu item select', () => {
        items[ 0 ].nativeElement.click();
        fixture.detectChanges();
        expect(items[ 0 ].nativeElement.classList.contains('ant-menu-item-selected')).toBe(true);
      });
      it('should menu disabled work', () => {
        items[ 1 ].nativeElement.click();
        fixture.detectChanges();
        expect(items[ 0 ].nativeElement.classList.contains('ant-menu-item-selected')).toBe(false);
      });
    });
    describe('inline', () => {
      let fixture;
      let testComponent;
      let items;
      let submenus;
      let menu;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzDemoMenuInlineComponent);
        testComponent = fixture.debugElement.componentInstance;
        items = fixture.debugElement.queryAll(By.directive(NzMenuItemDirective));
        menu = fixture.debugElement.query(By.directive(NzMenuDirective));
        submenus = fixture.debugElement.queryAll(By.directive(NzSubMenuComponent));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(submenus.every(subitem => subitem.nativeElement.classList.contains('ant-menu-submenu'))).toBe(true);
        expect(submenus.every(subitem => subitem.nativeElement.classList.contains('ant-menu-submenu-inline'))).toBe(true);
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
        const ul = submenus[ 0 ].nativeElement.querySelector('.ant-menu');
        const title = submenus[ 0 ].nativeElement.querySelector('.ant-menu-submenu-title');
        expect(ul.style.height).toBe('0px');
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).not.toBe('0px');
        expect(submenus[ 0 ].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).toBe('0px');
        expect(submenus[ 0 ].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(false);
      }));
    });
    describe('inline-collapsed', () => {
      let fixture;
      let testComponent;
      let items;
      let submenus;
      let menu;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzDemoMenuInlineCollapsedComponent);
        testComponent = fixture.debugElement.componentInstance;
        items = fixture.debugElement.queryAll(By.directive(NzMenuItemDirective));
        submenus = fixture.debugElement.queryAll(By.directive(NzSubMenuComponent));
        menu = fixture.debugElement.query(By.directive(NzMenuDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-dark ant-menu-inline');
        testComponent.isCollapsed = true;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-dark ant-menu-vertical ant-menu-inline-collapsed');
        testComponent.isCollapsed = false;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-dark ant-menu-inline');
      });
      it('should keep open after change mode', () => {
        fixture.detectChanges();
        let ul = submenus[ 0 ].nativeElement.querySelector('.ant-menu');
        const title = submenus[ 0 ].nativeElement.querySelector('.ant-menu-submenu-title');
        expect(ul.style.height).toBe('0px');
        testComponent.isCollapsed = true;
        fixture.detectChanges();
        testComponent.isCollapsed = false;
        fixture.detectChanges();
        ul = submenus[ 0 ].nativeElement.querySelector('.ant-menu');
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
      let fixture;
      let testComponent;
      let items;
      let submenus;
      let menu;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzDemoMenuSiderCurrentComponent);
        testComponent = fixture.debugElement.componentInstance;
        items = fixture.debugElement.queryAll(By.directive(NzMenuItemDirective));
        submenus = fixture.debugElement.queryAll(By.directive(NzSubMenuComponent));
        menu = fixture.debugElement.query(By.directive(NzMenuDirective));
      });
      it('should collapsed self work', fakeAsync(() => {
        fixture.detectChanges();
        const ul = submenus[ 0 ].nativeElement.querySelector('.ant-menu');
        const title = submenus[ 0 ].nativeElement.querySelector('.ant-menu-submenu-title');
        expect(ul.style.height).not.toBe('0px');
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).toBe('0px');
        expect(submenus[ 0 ].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(false);
        title.click();
        fixture.detectChanges();
        tick(500);
        expect(ul.style.height).not.toBe('0px');
        expect(submenus[ 0 ].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);
      }));
      it('should collapsed other work', fakeAsync(() => {
        fixture.detectChanges();
        const firstUl = submenus[ 0 ].nativeElement.querySelector('.ant-menu');
        const secondUl = submenus[ 1 ].nativeElement.querySelector('.ant-menu');
        const secondTitle = submenus[ 1 ].nativeElement.querySelector('.ant-menu-submenu-title');
        expect(firstUl.style.height).not.toBe('0px');
        expect(submenus[ 0 ].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);
        secondTitle.click();
        fixture.detectChanges();
        tick(500);
        expect(firstUl.style.height).toBe('0px');
        expect(submenus[ 0 ].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(false);
        expect(secondUl.style.height).not.toBe('0px');
        expect(submenus[ 1 ].nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);
      }));
    });
    describe('theme', () => {
      let fixture;
      let testComponent;
      let items;
      let submenus;
      let menu;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzDemoMenuThemeComponent);
        testComponent = fixture.debugElement.componentInstance;
        items = fixture.debugElement.queryAll(By.directive(NzMenuItemDirective));
        submenus = fixture.debugElement.queryAll(By.directive(NzSubMenuComponent));
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
    describe('swich-mode', () => {
      let fixture;
      let testComponent;
      let items;
      let submenus;
      let menu;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzDemoMenuSwitchModeComponent);
        testComponent = fixture.debugElement.componentInstance;
        items = fixture.debugElement.queryAll(By.directive(NzMenuItemDirective));
        submenus = fixture.debugElement.queryAll(By.directive(NzSubMenuComponent));
        menu = fixture.debugElement.query(By.directive(NzMenuDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-light ant-menu-inline');
        expect(submenus.every(submenu => submenu.nativeElement.classList.contains('ant-menu-submenu-inline'))).toBe(true);
        testComponent.mode = true;
        fixture.detectChanges();
        expect(menu.nativeElement.className).toBe('ant-menu ant-menu-root ant-menu-light ant-menu-vertical');
        expect(submenus.every(submenu => submenu.nativeElement.classList.contains('ant-menu-submenu-inline'))).toBe(false);
        expect(submenus.every(submenu => submenu.nativeElement.classList.contains('ant-menu-submenu-vertical'))).toBe(true);
      });
    });
  });
  describe('coverage', () => {
    describe('horizontal submenu', () => {
      let fixture;
      let testComponent;
      let submenu;
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
        subs[ 0 ].$mouseSubject.subscribe(mouseenterCallback);
        dispatchFakeEvent(title, 'mouseenter');
        fixture.detectChanges();
        expect(mouseenterCallback).toHaveBeenCalledWith(true);
        expect(mouseenterCallback).toHaveBeenCalledTimes(1);
      });
      it('should submenu mouseleave work', () => {
        fixture.detectChanges();
        const mouseleaveCallback = jasmine.createSpy('mouseleave callback');
        const subs = testComponent.subs.toArray();
        const title = submenu.nativeElement.querySelector('.ant-menu-submenu-title');
        subs[ 0 ].$mouseSubject.subscribe(mouseleaveCallback);
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
        subs[ 0 ].$subOpen.subscribe(nestedCallback);
        subs[ 1 ].nzOpen = true;
        subs[ 1 ].handleOpenEvent(false);
        fixture.detectChanges();
        expect(nestedCallback).toHaveBeenCalledWith(false);
        expect(nestedCallback).toHaveBeenCalledTimes(2);
      });
      it('should nested submenu disabled work', () => {
        testComponent.open = true;
        testComponent.disabled = true;
        fixture.detectChanges();
        const nestedCallback = jasmine.createSpy('nested callback');
        const subs = testComponent.subs.toArray();
        subs[ 0 ].$subOpen.subscribe(nestedCallback);
        subs[ 1 ].nzOpen = true;
        subs[ 1 ].handleOpenEvent(false);
        fixture.detectChanges();
        expect(nestedCallback).toHaveBeenCalledTimes(1);
      });
      it('should click submenu menu item close', () => {
        testComponent.open = true;
        fixture.detectChanges();
        const nestedCallback = jasmine.createSpy('nested callback');
        const subs = testComponent.subs.toArray();
        subs[ 1 ].nzOpen = true;
        fixture.detectChanges();
        subs[ 1 ].$mouseSubject.subscribe(nestedCallback);
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
        subs[ 1 ].$mouseSubject.subscribe(nestedCallback);
        subs[ 1 ].nzOpen = true;
        testComponent.disableditem.nativeElement.click();
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
            originX : 'start',
            originY : 'top',
            overlayX: 'end',
            overlayY: 'top'
          }
        } as ConnectedOverlayPositionChange;
        const fakeRightTopEvent = {
          connectionPair: {
            originX : 'end',
            originY : 'top',
            overlayX: 'start',
            overlayY: 'top'
          }
        } as ConnectedOverlayPositionChange;
        fixture.detectChanges();
        testComponent.open = true;
        const subs = testComponent.subs.toArray();
        subs[ 1 ].nzOpen = true;
        fixture.detectChanges();
        subs[ 1 ].onPositionChange(fakeLeftTopEvent);
        fixture.detectChanges();
        expect(subs[ 1 ].placement).toBe('leftTop');
        subs[ 1 ].onPositionChange(fakeRightTopEvent);
        fixture.detectChanges();
        expect(subs[ 1 ].placement).toBe('rightTop');
      });
    });
    describe('inline submenu', () => {
      let fixture;
      let testComponent;
      let submenu;
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
    describe('ng-for', () => {
      it('should ng for works fine', () => {
        TestBed.createComponent(NzDemoMenuNgForComponent).detectChanges();
      });
    });
  });
});

@Component({
  selector: 'nz-test-menu-horizontal',
  template: `
    <ul nz-menu [nzMode]="'horizontal'">
      <li nz-submenu [nzOpen]="open" [style.width.px]="width">
        <span title><i nz-icon type="setting"></i> Navigation Three - Submenu</span>
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
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
              <li nz-submenu [nzDisabled]="disabled">
                <span title>Sub Menu</span>
                <ul>
                  <li nz-menu-item #menuitem>Option 5</li>
                  <li nz-menu-item #disableditem nzDisabled>Option 6</li>
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
  @ViewChildren(NzSubMenuComponent) subs: QueryList<NzSubMenuComponent>;
  @ViewChild('menuitem', { read: ElementRef }) menuitem: ElementRef;
  @ViewChild('disableditem', { read: ElementRef }) disableditem: ElementRef;
}

@Component({
  selector: 'nz-test-menu-inline',
  template: `
    <ul nz-menu [nzMode]="'inline'" [nzInlineCollapsed]="collapse">
      <li nz-submenu [nzDisabled]="disabled">
        <span title><i nz-icon type="mail"></i> Navigation One</span>
        <ul>
          <li nz-menu-item style="padding-left:0px;">Option 1</li>
          <li nz-menu-item>Option 2</li>
        </ul>
      </li>
    </ul>
  `,
  styles  : []
})
export class NzTestMenuInlineComponent {
  disabled = false;
  collapse = false;
  @ViewChild(NzSubMenuComponent) subsmenu: NzSubMenuComponent;
  @ViewChild('menuitem', { read: ElementRef }) menuitem: ElementRef;
}

@Component({
  selector: 'nz-demo-menu-ngfor',
  template: `
    <ul nz-menu [nzMode]="'inline'" style="width: 240px;">
      <li *ngFor="let l1 of menus" nz-submenu>
        <span title><i nz-icon type="appstore"></i> {{l1.text}}</span>
        <ul>
          <li *ngFor="let l2 of l1.children" nz-submenu>
            <span title>{{l2.text}}</span>
            <ul>
              <li *ngFor="let l3 of l2.children" nz-menu-item>{{l3.text}}</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>`,
  styles  : []
})
export class NzDemoMenuNgForComponent {
  menus = [
    {
      text    : 'level1',
      children: [
        {
          text    : 'level2',
          children: [
            { text: 'level3' }
          ]
        }
      ]
    }
  ];
}
