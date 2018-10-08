import { Directionality } from '@angular/cdk/bidi';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { async, fakeAsync, inject, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import { createMouseEvent, dispatchFakeEvent } from '../core/testing';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzMenuModule } from '../menu/nz-menu.module';
import { NzSubMenuComponent } from '../menu/nz-submenu.component';

import { NzDropDownButtonComponent } from './nz-dropdown-button.component';
import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { NzDropDownModule } from './nz-dropdown.module';
import { NzDropdownService } from './nz-dropdown.service';

describe('dropdown', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  const scrolledSubject = new Subject();
  beforeEach(async(() => {
    const dir = 'ltr';
    TestBed.configureTestingModule({
      imports     : [ NzMenuModule, NoopAnimationsModule, NzDropDownModule, NoopAnimationsModule, NzIconModule ],
      declarations: [ NzTestDropdownComponent, NzTestDropdownButtonComponent, NzTestDropdownWithButtonComponent, NzTestDropdownContextmenuComponent ],
      providers   : [
        NzDropdownService,
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
  describe('nz-dropdown-directive', () => {
    let fixture;
    let testComponent;
    let link;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownComponent);
      testComponent = fixture.debugElement.componentInstance;
      link = fixture.debugElement.query(By.directive(NzDropDownDirective));
    });
    it('should mouseenter event trigger', fakeAsync(() => {
      const mouseenterCallback = jasmine.createSpy('mouseenter callback');
      testComponent.nzDropDownDirective.$mouseenter.subscribe(mouseenterCallback);
      dispatchFakeEvent(link.nativeElement, 'mouseenter');
      fixture.detectChanges();
      expect(mouseenterCallback).toHaveBeenCalledTimes(1);
    }));
    it('should mouseleave event trigger', fakeAsync(() => {
      const mouseleaveCallback = jasmine.createSpy('mouseleave callback');
      testComponent.nzDropDownDirective.$mouseleave.subscribe(mouseleaveCallback);
      dispatchFakeEvent(link.nativeElement, 'mouseleave');
      fixture.detectChanges();
      expect(mouseleaveCallback).toHaveBeenCalledTimes(1);
    }));
    it('should click event trigger', fakeAsync(() => {
      const clickCallback = jasmine.createSpy('click callback');
      testComponent.nzDropDownDirective.$click.subscribe(clickCallback);
      dispatchFakeEvent(link.nativeElement, 'click');
      fixture.detectChanges();
      expect(clickCallback).toHaveBeenCalledTimes(1);
    }));
    it('should className add in a', () => {
      fixture.detectChanges();
      expect(link.nativeElement.classList.contains('ant-dropdown-link')).toBe(true);
    });
    it('should className not add in button', () => {
      const buttonFixture = TestBed.createComponent(NzTestDropdownWithButtonComponent);
      buttonFixture.detectChanges();
      expect(buttonFixture.debugElement.query(By.directive(NzDropDownDirective)).nativeElement.classList.contains('ant-dropdown-link')).toBe(false);
    });
  });
  describe('nz-dropdown-component', () => {
    let fixture;
    let testComponent;
    let link;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownComponent);
      testComponent = fixture.debugElement.componentInstance;
      link = fixture.debugElement.query(By.directive(NzDropDownDirective));
    });
    it('should className add', () => {
      fixture.detectChanges();
      expect(link.nativeElement.classList.contains('ant-dropdown-trigger')).toBe(true);
    });
    it('should overlay display', () => {
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
      testComponent.visible = true;
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
    });
    it('should selectable true work', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      let items = overlayContainerElement.querySelectorAll('.ant-dropdown-menu-item') as NodeListOf<HTMLElement>;
      items[ 0 ].click();
      testComponent.visible = false;
      fixture.detectChanges();
      testComponent.visible = true;
      fixture.detectChanges();
      items = overlayContainerElement.querySelectorAll('.ant-dropdown-menu-item') as NodeListOf<HTMLElement>;
      expect(items[ 0 ].classList.contains('ant-dropdown-menu-item')).toBe(true);
      expect(items[ 0 ].classList.contains('ant-dropdown-menu-item-selected')).toBe(true);
    });
    it('should selectable false work', () => {
      testComponent.visible = true;
      testComponent.selectable = false;
      fixture.detectChanges();
      let items = overlayContainerElement.querySelectorAll('.ant-dropdown-menu-item') as NodeListOf<HTMLElement>;
      items[ 0 ].click();
      testComponent.visible = false;
      fixture.detectChanges();
      testComponent.visible = true;
      fixture.detectChanges();
      items = overlayContainerElement.querySelectorAll('.ant-dropdown-menu-item') as NodeListOf<HTMLElement>;
      expect(items[ 0 ].classList.contains('ant-dropdown-menu-item')).toBe(true);
      expect(items[ 0 ].classList.contains('ant-dropdown-menu-item-selected')).toBe(false);
    });
    it('should backdrop work with click', () => {
      testComponent.trigger = 'click';
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
      testComponent.visible = true;
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      fixture.detectChanges();
      const backdropCallback = jasmine.createSpy('backdrop callback');
      testComponent.nzDropDownComponent.$visibleChange.subscribe(backdropCallback);
      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      backdrop.click();
      fixture.detectChanges();
      expect(backdropCallback).toHaveBeenCalledTimes(1);
    });
    it('should disabled work', () => {
      fixture.detectChanges();
      expect(!!link.nativeElement.attributes.getNamedItem('disabled')).toBe(false);
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(!!link.nativeElement.attributes.getNamedItem('disabled')).toBe(true);
    });
    it('should placement work', () => {
      const placementArray = [ 'bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight' ];
      testComponent.visible = true;
      placementArray.forEach(placement => {
        testComponent.placement = placement;
        fixture.detectChanges();
        const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
        expect(dropdown.classList.contains(`ant-dropdown-placement-${placement}`)).toBe(true);
      });
    });
    it('should mouseenter event trigger', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
      const mouseenterCallback = jasmine.createSpy('mouseenter callback');
      testComponent.nzDropDownComponent.$visibleChange.subscribe(mouseenterCallback);
      dispatchFakeEvent(dropdown, 'mouseenter');
      fixture.detectChanges();
      expect(mouseenterCallback).toHaveBeenCalledWith(true);
      expect(mouseenterCallback).toHaveBeenCalledTimes(1);
    });
    it('should mouseleave event trigger', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
      const mouseleaveCallback = jasmine.createSpy('mouseleave callback');
      testComponent.nzDropDownComponent.$visibleChange.subscribe(mouseleaveCallback);
      dispatchFakeEvent(dropdown, 'mouseleave');
      fixture.detectChanges();
      expect(mouseleaveCallback).toHaveBeenCalledWith(false);
      expect(mouseleaveCallback).toHaveBeenCalledTimes(1);
    });
    it('should nzVisibleChange event trigger correct', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(0);
      testComponent.visible = false;
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(0);
      testComponent.nzDropDownComponent.onVisibleChange(true);
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(1);
      testComponent.nzDropDownComponent.onVisibleChange(false);
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(2);
      testComponent.visible = true;
      testComponent.nzDropDownComponent.onVisibleChange(false);
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(2);
    });
    it('should submenu event trigger', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      const nestedCallback = jasmine.createSpy('nested callback');
      const submenu = testComponent.nzSubMenuComponent;
      submenu.nzOpen = true;
      submenu.handleOpenEvent(false);
      testComponent.nzDropDownComponent.$subOpen.subscribe(nestedCallback);
      fixture.detectChanges();
      expect(nestedCallback).toHaveBeenCalledWith(false);
      expect(nestedCallback).toHaveBeenCalledTimes(1);
    });
  });
  describe('nz-dropdown-component-button', () => {
    let fixture;
    let testComponent;
    let button;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownButtonComponent);
      testComponent = fixture.debugElement.componentInstance;
      button = fixture.debugElement.query(By.directive(NzDropDownDirective));
    });
    it('should click left trigger', () => {
      fixture.detectChanges();
      const buttonItem = button.nativeElement.querySelector('.ant-btn');
      expect(!!buttonItem.attributes.getNamedItem('disabled')).toBe(false);
      buttonItem.click();
      fixture.detectChanges();
      expect(testComponent.click).toHaveBeenCalledTimes(1);
    });
    it('should click right trigger', () => {
      fixture.detectChanges();
      const buttonItem = button.nativeElement.querySelector('.ant-btn-icon-only');
      expect(!!buttonItem.attributes.getNamedItem('disabled')).toBe(false);
      const clickCallback = jasmine.createSpy('click callback');
      testComponent.nzDropDownButtonComponent.$visibleChange.subscribe(clickCallback);
      buttonItem.click();
      fixture.detectChanges();
      expect(testComponent.click).toHaveBeenCalledTimes(0);
      expect(clickCallback).toHaveBeenCalledTimes(1);
      expect(clickCallback).toHaveBeenCalledWith(true);
    });
    it('should disabled work', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      const buttonItem = button.nativeElement.querySelector('.ant-btn');
      expect(!!buttonItem.attributes.getNamedItem('disabled')).toBe(true);
      const clickCallback = jasmine.createSpy('click callback');
      testComponent.nzDropDownButtonComponent.$visibleChange.subscribe(clickCallback);
      buttonItem.click();
      fixture.detectChanges();
      expect(testComponent.click).toHaveBeenCalledTimes(0);
      expect(clickCallback).toHaveBeenCalledTimes(0);
      testComponent.nzDropDownButtonComponent.onVisibleChange(true);
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(0);
    });
    it('should nzVisibleChange event trigger correct', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(0);
      testComponent.visible = false;
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(0);
      testComponent.nzDropDownButtonComponent.onVisibleChange(true);
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(1);
      testComponent.nzDropDownButtonComponent.onVisibleChange(false);
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(2);
      testComponent.visible = true;
      testComponent.nzDropDownButtonComponent.onVisibleChange(false);
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(2);
    });
    it('should placement work', () => {
      const placementArray = [ 'bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight' ];
      testComponent.visible = true;
      placementArray.forEach(placement => {
        testComponent.placement = placement;
        fixture.detectChanges();
        const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
        expect(dropdown.classList.contains(`ant-dropdown-placement-${placement}`)).toBe(true);
      });
    });
    it('should submenu event trigger', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      const nestedCallback = jasmine.createSpy('nested callback');
      const submenu = testComponent.nzSubMenuComponent;
      submenu.nzOpen = true;
      submenu.handleOpenEvent(false);
      testComponent.nzDropDownButtonComponent.$subOpen.subscribe(nestedCallback);
      fixture.detectChanges();
      expect(nestedCallback).toHaveBeenCalledWith(false);
      expect(nestedCallback).toHaveBeenCalledTimes(1);
    });
  });
  describe('nz-dropdown-service', () => {
    let fixture;
    let testComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownContextmenuComponent);
      testComponent = fixture.debugElement.componentInstance;
    });
    it('should create dropdown', () => {
      const fakeEvent = createMouseEvent('contextmenu', 300, 300);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
      // https://github.com/angular/material2/pull/12119
      // TODO: fix
      // expect(window.getComputedStyle(overlayPane, null).top).toBe(`${300 - overlayContainerElement.getBoundingClientRect().top}px`);
      testComponent.nzDropdownService.close();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    });
    it('should only one dropdown exist', () => {
      let fakeEvent = createMouseEvent('contextmenu', 0, 0);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      fakeEvent = createMouseEvent('contextmenu', window.innerWidth, window.innerHeight);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    });
    it('should dropdown close when scroll', () => {
      const fakeEvent = createMouseEvent('contextmenu', 500, 500);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      scrolledSubject.next();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    });
    it('should animation work', () => {
      const fakeEvent = createMouseEvent('contextmenu', 500, 500);
      const contextComponent = testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      contextComponent.close();
      contextComponent.afterAnimation();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    });
    it('should backdrop work with click', fakeAsync(() => {
      const fakeEvent = createMouseEvent('contextmenu', 100, 100);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      backdrop.click();
      tick(500);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    }));
    it('should prevent contextmenu after create', fakeAsync(() => {
      const fakeEvent = createMouseEvent('contextmenu', 100, 100);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      tick(500);
      fixture.detectChanges();
      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      const fakeContextEvent = createMouseEvent('contextmenu', 200, 200);
      spyOn(fakeContextEvent, 'preventDefault');
      backdrop.dispatchEvent(fakeContextEvent);
      tick(500);
      fixture.detectChanges();
      expect(fakeContextEvent.preventDefault).toHaveBeenCalled();
      tick(500);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
    }));
  });
});

@Component({
  selector: 'nz-test-dropdown',
  template: `
    <nz-dropdown [(nzVisible)]="visible" [nzClickHide]="clickHide" [nzPlacement]="placement" (nzVisibleChange)="visibleChange($event)" [nzTrigger]="trigger" [nzDisabled]="disabled">
      <a nz-dropdown>
        Hover me <i nz-icon type="down"></i>
      </a>
      <ul nz-menu [nzSelectable]="selectable">
        <li nz-menu-item>
          <a>1st menu item</a>
        </li>
        <li nz-menu-item>
          <a>2nd menu item</a>
        </li>
        <li nz-submenu>
          <span title>sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </nz-dropdown>`,
  styles  : []
})
export class NzTestDropdownComponent {
  @ViewChild(NzDropDownComponent) nzDropDownComponent: NzDropDownComponent;
  @ViewChild(NzDropDownDirective) nzDropDownDirective: NzDropDownDirective;
  @ViewChild(NzSubMenuComponent) nzSubMenuComponent: NzSubMenuComponent;
  visible = false;
  selectable = true;
  trigger = 'hover';
  placement = 'bottomLeft';
  disabled = false;
  clickHide = true;
  visibleChange = jasmine.createSpy('visibleChange callback');
}

@Component({
  selector: 'nz-test-dropdown-button',
  template: `
    <nz-dropdown-button (nzClick)="click($event)" [nzVisible]="visible" [nzPlacement]="placement" [nzDisabled]="disabled" [nzTrigger]="'click'" (nzVisibleChange)="visibleChange($event)">
      DropDown
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-submenu>
          <span title>sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </nz-dropdown-button>`,
  styles  : []
})
export class NzTestDropdownButtonComponent {
  @ViewChild(NzDropDownButtonComponent) nzDropDownButtonComponent: NzDropDownButtonComponent;
  @ViewChild(NzSubMenuComponent) nzSubMenuComponent: NzSubMenuComponent;
  disabled = false;
  visible = false;
  placement = 'bottomLeft';

  click = jasmine.createSpy('click callback');
  visibleChange = jasmine.createSpy('visibleChange callback');
}

@Component({
  selector: 'nz-test-dropdown-with-button',
  template: `
    <nz-dropdown>
      <button nz-button nz-dropdown><span>Button</span> <i nz-icon type="down"></i></button>
      <ul nz-menu>
        <li nz-menu-item>
          <a>1st menu item</a>
        </li>
        <li nz-menu-item>
          <a>2nd menu item</a>
        </li>
        <li nz-menu-item>
          <a>3rd menu item</a>
        </li>
      </ul>
    </nz-dropdown>`,
  styles  : []
})
export class NzTestDropdownWithButtonComponent {
}

@Component({
  selector: 'nz-test-dropdown-contextmenu',
  template: `
    <ng-template #template>
      <ul nz-menu nzInDropDown>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-menu-item nzDisabled>disabled menu item</li>
        <li nz-submenu>
          <span title>sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
        <li nz-submenu nzDisabled>
          <span title>disabled sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </ng-template>`
})
export class NzTestDropdownContextmenuComponent {
  @ViewChild('template') template: TemplateRef<void>;

  constructor(public nzDropdownService: NzDropdownService) {
  }
}
